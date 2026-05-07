/**
 * Servicio de gestion de dispositivos (sensores).
 */
const db = require('../config/database');

async function listAll() {
  const r = await db.query(
    `SELECT * FROM v_dispositivos_estado ORDER BY id_dispositivo`
  );
  return r.rows;
}

async function getById(id) {
  const r = await db.query(
    `SELECT * FROM v_dispositivos_estado WHERE id_dispositivo = $1`,
    [id]
  );
  return r.rows[0] || null;
}

async function create(data) {
  const {
    id_estacion, id_tipo, codigo_hardware, nombre, modelo,
    extension_log = '.log', formato_log = 'CSV_SIMPLE',
    estado_actual = 'INACTIVO', activo = true,
  } = data;

  const r = await db.query(
    `INSERT INTO dispositivo
       (id_estacion, id_tipo, codigo_hardware, nombre, modelo,
        extension_log, formato_log, estado_actual, activo)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
     RETURNING *`,
    [id_estacion, id_tipo, codigo_hardware, nombre, modelo,
     extension_log, formato_log, estado_actual, activo]
  );
  return r.rows[0];
}

async function update(id, data) {
  const fields = [];
  const values = [];
  let i = 1;
  for (const [key, value] of Object.entries(data)) {
    if (value === undefined) continue;
    fields.push(`${key} = $${i}`);
    values.push(value);
    i += 1;
  }
  if (fields.length === 0) return getById(id);
  values.push(id);
  const r = await db.query(
    `UPDATE dispositivo SET ${fields.join(', ')}
     WHERE id_dispositivo = $${i} RETURNING *`,
    values
  );
  return r.rows[0];
}

async function remove(id) {
  await db.query('DELETE FROM dispositivo WHERE id_dispositivo = $1', [id]);
}

async function getVariables(idDispositivo) {
  const r = await db.query(
    `SELECT vm.*
       FROM variable_medida vm
       JOIN dispositivo d ON d.id_tipo = vm.id_tipo
      WHERE d.id_dispositivo = $1
      ORDER BY vm.posicion_columna`,
    [idDispositivo]
  );
  return r.rows;
}

async function getStateHistory(idDispositivo, limit = 50) {
  const r = await db.query(
    `SELECT l.*, u.nombre AS usuario
       FROM log_estado_maquina l
       LEFT JOIN usuario u ON u.id_usuario = l.id_usuario
      WHERE l.id_dispositivo = $1
      ORDER BY l.fecha_hora DESC
      LIMIT $2`,
    [idDispositivo, limit]
  );
  return r.rows;
}

module.exports = {
  listAll, getById, create, update, remove,
  getVariables, getStateHistory,
};
