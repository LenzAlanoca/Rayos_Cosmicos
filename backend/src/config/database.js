/**
 * Pool de conexiones a PostgreSQL.
 * Tambien expone una conexion dedicada para LISTEN/NOTIFY.
 */
const { Pool, Client } = require('pg');
require('dotenv').config();

const config = {
  host:     process.env.DB_HOST     || 'localhost',
  port:     parseInt(process.env.DB_PORT, 10) || 5432,
  database: process.env.DB_NAME     || 'rayos_cosmicos',
  user:     process.env.DB_USER     || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  max:                parseInt(process.env.DB_POOL_MAX, 10)         || 20,
  idleTimeoutMillis:  parseInt(process.env.DB_POOL_IDLE_TIMEOUT, 10) || 30000,
};

const pool = new Pool(config);

pool.on('error', (err) => {
  // eslint-disable-next-line no-console
  console.error('[DB] Error inesperado en cliente inactivo:', err);
});

/**
 * Helper de query con logging.
 */
async function query(text, params) {
  const start = Date.now();
  const res = await pool.query(text, params);
  const duration = Date.now() - start;
  if (process.env.NODE_ENV === 'development' && duration > 200) {
    // eslint-disable-next-line no-console
    console.log(`[DB] query lenta (${duration}ms): ${text.substring(0, 80)}...`);
  }
  return res;
}

/**
 * Crea un cliente DEDICADO para LISTEN/NOTIFY (no devuelve al pool).
 */
function createListener() {
  return new Client(config);
}

/**
 * Cierra el pool al terminar.
 */
async function close() {
  await pool.end();
}

module.exports = { pool, query, createListener, close };
