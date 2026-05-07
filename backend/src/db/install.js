/**
 * Instalador de la base de datos.
 * Ejecuta los scripts SQL del directorio /sql en orden.
 *
 * Uso:
 *   1) Crear primero la BD:  psql -U postgres -f sql/01_crear_database.sql
 *   2) Luego:                npm run db:install
 */
const fs = require('fs');
const path = require('path');
const { Client } = require('pg');
require('dotenv').config();

const SQL_DIR = path.join(__dirname, '..', '..', 'sql');

// Archivos a ejecutar dentro de la BD ya creada (en orden)
const SCRIPTS = [
  '02_crear_tablas.sql',
  '03_crear_indices.sql',
  '04_datos_iniciales.sql',
  '05_crear_vistas.sql',
  '06_funciones_triggers.sql',
  '07_sesiones.sql',
];

async function run() {
  const client = new Client({
    host:     process.env.DB_HOST || 'localhost',
    port:     parseInt(process.env.DB_PORT, 10) || 5432,
    database: process.env.DB_NAME || 'rayos_cosmicos',
    user:     process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
  });

  try {
    console.log('[DB] Conectando a', process.env.DB_NAME || 'rayos_cosmicos');
    await client.connect();

    for (const file of SCRIPTS) {
      const filePath = path.join(SQL_DIR, file);
      if (!fs.existsSync(filePath)) {
        console.warn(`[DB] No se encontro ${file}, saltando.`);
        continue;
      }
      const sql = fs.readFileSync(filePath, 'utf8');
      console.log(`[DB] Ejecutando ${file} ...`);
      await client.query(sql);
      console.log(`[DB]   -> OK`);
    }

    console.log('[DB] Instalacion completa.');
  } catch (err) {
    console.error('[DB] ERROR:', err.message);
    process.exitCode = 1;
  } finally {
    await client.end();
  }
}

run();
