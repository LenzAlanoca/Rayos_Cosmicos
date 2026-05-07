/**
 * Servicio de ingestion de archivos .log del detector de muones.
 *
 * Formato esperado de cada linea (CSV simple, separado por comas):
 *   838, 404, 798, 0, 6676, 9735, 6929, Thu Apr 16 14:19:47 2026
 *
 *   col 1..7: valores numericos (mapean a variable_medida.posicion_columna)
 *   col 8:    timestamp en formato "EEE MMM dd HH:mm:ss yyyy"
 */
const fs = require('fs');
const crypto = require('crypto');
const path = require('path');
const readline = require('readline');
const db = require('../config/database');
const logger = require('../config/logger');

/**
 * Convierte un timestamp tipo "Thu Apr 16 14:19:47 2026" a Date JS.
 */
function parseLogDate(str) {
  // El parser nativo de JS entiende este formato si esta limpio.
  const d = new Date(str);
  if (isNaN(d.getTime())) {
    throw new Error(`Fecha invalida en log: "${str}"`);
  }
  return d;
}

/**
 * Calcula SHA-256 del archivo.
 */
function hashFile(filePath) {
  return new Promise((resolve, reject) => {
    const hash = crypto.createHash('sha256');
    const stream = fs.createReadStream(filePath);
    stream.on('error', reject);
    stream.on('data', (chunk) => hash.update(chunk));
    stream.on('end', () => resolve(hash.digest('hex')));
  });
}

/**
 * Carga el mapeo posicion_columna -> id_variable para un dispositivo.
 */
async function loadVariableMap(idDispositivo) {
  const r = await db.query(
    `SELECT vm.id_variable, vm.posicion_columna
       FROM variable_medida vm
       JOIN dispositivo d ON d.id_tipo = vm.id_tipo
      WHERE d.id_dispositivo = $1
      ORDER BY vm.posicion_columna`,
    [idDispositivo]
  );
  // Devuelve un objeto: { 1: id_variable_1, 2: id_variable_2, ... }
  const map = {};
  for (const row of r.rows) {
    map[row.posicion_columna] = row.id_variable;
  }
  return map;
}

/**
 * Procesa una linea CSV: separa por comas y devuelve {valores[], fecha}.
 */
function parseLine(line) {
  const parts = line.split(',').map((s) => s.trim());
  if (parts.length < 2) return null;

  // La ultima parte es la fecha; las anteriores son numeros.
  const fechaStr = parts[parts.length - 1];
  const valoresStr = parts.slice(0, -1);

  const valores = valoresStr.map((v) => {
    const n = parseFloat(v);
    return isNaN(n) ? null : n;
  });

  const fecha = parseLogDate(fechaStr);
  return { valores, fecha };
}

/**
 * Ingiere un archivo .log para un dispositivo.
 *
 * Inserta en transaccion:
 *   - 1 fila en archivo_log
 *   - N filas en evento_cientifico
 *   - N*7 filas en valor_medido
 *
 * Inserta por lotes (batch) para no saturar la BD.
 */
async function ingestFile({ filePath, idDispositivo, nombreArchivo }) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`Archivo no encontrado: ${filePath}`);
  }

  // 1) Hash + verificacion de duplicado
  const hash = await hashFile(filePath);
  const exists = await db.query(
    'SELECT id_archivo FROM archivo_log WHERE hash_archivo = $1',
    [hash]
  );
  if (exists.rows.length > 0) {
    logger.warn(`Archivo ya importado previamente (hash: ${hash.substring(0, 12)}...)`);
    return { skipped: true, idArchivo: exists.rows[0].id_archivo };
  }

  // 2) Mapa de variables
  const varMap = await loadVariableMap(idDispositivo);
  if (Object.keys(varMap).length === 0) {
    throw new Error(`No hay variables registradas para dispositivo ${idDispositivo}`);
  }

  const stats = fs.statSync(filePath);

  // 3) Conexion dedicada para la transaccion
  const client = await db.pool.connect();
  let idArchivo;
  let lineasOk = 0;
  let lineasFallidas = 0;

  try {
    await client.query('BEGIN');

    // 3.1) Crear el archivo_log
    const archivoRes = await client.query(
      `INSERT INTO archivo_log
         (id_dispositivo, nombre_archivo, ruta_archivo,
          fecha_inicio, hash_archivo, tamano_bytes)
       VALUES ($1, $2, $3, NOW(), $4, $5)
       RETURNING id_archivo`,
      [idDispositivo, nombreArchivo || path.basename(filePath),
       filePath, hash, stats.size]
    );
    idArchivo = archivoRes.rows[0].id_archivo;

    // 3.2) Leer el archivo linea por linea (streaming)
    const stream = fs.createReadStream(filePath);
    const rl = readline.createInterface({
      input: stream,
      crlfDelay: Infinity,
    });

    let numeroLinea = 0;
    const BATCH_SIZE = 500;
    let batchEventos = [];
    let batchValores = [];

    for await (const rawLine of rl) {
      numeroLinea += 1;
      const line = rawLine.trim();
      if (!line || line.startsWith('#')) continue;

      let parsed;
      try {
        parsed = parseLine(line);
      } catch (e) {
        logger.warn(`Linea ${numeroLinea} invalida: ${e.message}`);
        lineasFallidas += 1;
        continue;
      }
      if (!parsed) {
        lineasFallidas += 1;
        continue;
      }

      batchEventos.push({
        numero_linea: numeroLinea,
        fecha_hora: parsed.fecha,
        valores: parsed.valores,
      });

      if (batchEventos.length >= BATCH_SIZE) {
        const ok = await flushBatch(client, idArchivo, varMap, batchEventos);
        lineasOk += ok;
        batchEventos = [];
      }
    }

    // Flush final
    if (batchEventos.length > 0) {
      const ok = await flushBatch(client, idArchivo, varMap, batchEventos);
      lineasOk += ok;
    }

    // 3.3) Actualizar contador
    await client.query(
      'UPDATE archivo_log SET lineas_totales = $1 WHERE id_archivo = $2',
      [numeroLinea, idArchivo]
    );

    await client.query('COMMIT');
    logger.info(
      `Ingesta OK [archivo ${idArchivo}]: ${lineasOk} eventos, ${lineasFallidas} fallidas`
    );

    return {
      skipped:        false,
      idArchivo,
      eventos:        lineasOk,
      lineasFallidas,
      lineasTotales:  numeroLinea,
    };
  } catch (err) {
    await client.query('ROLLBACK');
    logger.error(`Error en ingesta: ${err.message}`);
    throw err;
  } finally {
    client.release();
  }
}

/**
 * Inserta un lote de eventos + valores en la BD.
 */
async function flushBatch(client, idArchivo, varMap, batch) {
  if (batch.length === 0) return 0;

  // 1) INSERT masivo de eventos con RETURNING id_evento
  const eventosValues = [];
  const eventosParams = [];
  let p = 1;
  for (const ev of batch) {
    eventosValues.push(`($${p++}, $${p++}, $${p++})`);
    eventosParams.push(idArchivo, ev.numero_linea, ev.fecha_hora);
  }
  const evRes = await client.query(
    `INSERT INTO evento_cientifico (id_archivo, numero_linea, fecha_hora)
     VALUES ${eventosValues.join(', ')}
     RETURNING id_evento, numero_linea`,
    eventosParams
  );

  // Mapa numero_linea -> id_evento
  const lineToEvent = {};
  for (const row of evRes.rows) {
    lineToEvent[row.numero_linea] = row.id_evento;
  }

  // 2) INSERT masivo de valores (por cada evento, una fila por variable)
  const valoresParts = [];
  const valoresParams = [];
  let q = 1;
  for (const ev of batch) {
    const idEvento = lineToEvent[ev.numero_linea];
    for (let i = 0; i < ev.valores.length; i += 1) {
      const posicion = i + 1;
      const idVar = varMap[posicion];
      if (!idVar) continue;          // posicion sin mapear
      const valor = ev.valores[i];
      if (valor === null) continue;  // valor invalido
      valoresParts.push(`($${q++}, $${q++}, $${q++})`);
      valoresParams.push(idEvento, idVar, valor);
    }
  }

  if (valoresParts.length > 0) {
    await client.query(
      `INSERT INTO valor_medido (id_evento, id_variable, valor)
       VALUES ${valoresParts.join(', ')}`,
      valoresParams
    );
  }

  return batch.length;
}

module.exports = { ingestFile, parseLogDate, parseLine };
