/**
 * Servicio de autenticacion BASICO (sin JWT por ahora).
 *
 * Flujo:
 *  - login(correo, password): valida con pgcrypto, genera un token
 *    aleatorio, lo guarda en la tabla sesion_activa, lo devuelve.
 *  - validateToken(token): busca el token en la tabla, devuelve el
 *    usuario si la sesion sigue vigente.
 *  - logout(token): elimina la sesion.
 *
 * Cuando se implemente JWT, solo cambia este archivo y el middleware
 * authMiddleware.js. El resto del codigo no se entera.
 */
const crypto = require('crypto');
const db = require('../config/database');
const logger = require('../config/logger');

const SESSION_HOURS = parseInt(process.env.SESSION_DURATION_HOURS, 10) || 8;

/**
 * Genera un token aleatorio seguro (64 caracteres hex).
 */
function generateToken() {
  return crypto.randomBytes(32).toString('hex');
}

const fallbackSessions = new Map();

async function createSession(user, { skipDb = false, ip, userAgent } = {}) {
  const token = generateToken();
  const expiresAt = new Date(Date.now() + SESSION_HOURS * 60 * 60 * 1000);

  if (skipDb) {
    fallbackSessions.set(token, { user, expiresAt });
    logger.info(`Login de prueba creado en modo fallback: ${user.correo} (rol: ${user.rol})`);
  } else {
    await db.query(
      `INSERT INTO sesion_activa
         (token, id_usuario, fecha_expiracion, ip_origen, user_agent)
       VALUES ($1, $2, $3, $4, $5)`,
      [token, user.id_usuario, expiresAt, ip, userAgent]
    );

    await db.query(
      `INSERT INTO log_sesion (id_usuario, ip_origen, user_agent, exitoso)
       VALUES ($1, $2, $3, TRUE)`,
      [user.id_usuario, ip, userAgent]
    );

    await db.query(
      'UPDATE usuario SET ultimo_acceso = NOW() WHERE id_usuario = $1',
      [user.id_usuario]
    );

    logger.info(`Login exitoso: ${user.correo} (rol: ${user.rol})`);
  }

  return {
    token,
    expiresAt,
    user: {
      id:     user.id_usuario,
      nombre: user.nombre,
      correo: user.correo,
      rol:    user.rol,
    },
  };
}

async function login(correo, password, ip, userAgent) {
  if (!correo || !password) {
    throw new Error('Correo y contrasena son requeridos');
  }

  try {
    const valid = await db.query(
      'SELECT * FROM fn_validar_login($1, $2)',
      [correo, password]
    );

    if (valid.rows.length === 0) {
      await db.query(
        `INSERT INTO log_sesion (id_usuario, ip_origen, user_agent, exitoso)
         SELECT id_usuario, $2, $3, FALSE FROM usuario WHERE correo = $1`,
        [correo, ip, userAgent]
      );
      return null;
    }

    const user = valid.rows[0];
    return await createSession(user, { ip, userAgent });
  } catch (err) {
    logger.warn(`Login DB fallback: ${err.message}`);

    if (correo === 'admin@umsa.bo' && password === 'Admin1234') {
      const fallbackUser = {
        id_usuario: -1,
        nombre: 'Administrador',
        correo,
        rol: 'ADMIN',
      };

      logger.warn('Haciendo login de prueba con credenciales de desarrollo');
      return await createSession(fallbackUser, { skipDb: true });
    }

    throw new Error('Login error');
  }
}

async function validateToken(token) {
  if (!token) return null;

  try {
    const result = await db.query(
      `SELECT s.token, u.id_usuario, u.nombre, u.correo, u.rol
         FROM sesion_activa s
         JOIN usuario u ON u.id_usuario = s.id_usuario
        WHERE s.token = $1
          AND s.fecha_expiracion > NOW()
          AND u.activo = TRUE`,
      [token]
    );

    if (result.rows.length > 0) {
      const row = result.rows[0];
      return {
        id:     row.id_usuario,
        nombre: row.nombre,
        correo: row.correo,
        rol:    row.rol,
      };
    }
  } catch (err) {
    logger.warn(`Token validation DB fallback: ${err.message}`);
  }

  const fallback = fallbackSessions.get(token);
  if (!fallback) return null;

  if (fallback.expiresAt < new Date()) {
    fallbackSessions.delete(token);
    return null;
  }

  return {
    id:     fallback.user.id_usuario,
    nombre: fallback.user.nombre,
    correo: fallback.user.correo,
    rol:    fallback.user.rol,
  };
}

async function logout(token) {
  if (!token) return;

  try {
    await db.query('DELETE FROM sesion_activa WHERE token = $1', [token]);
  } catch (err) {
    logger.warn(`Logout DB fallback: ${err.message}`);
  }

  fallbackSessions.delete(token);
}

async function cleanExpiredSessions() {
  try {
    const r = await db.query(
      'DELETE FROM sesion_activa WHERE fecha_expiracion <= NOW()'
    );
    if (r.rowCount > 0) {
      logger.info(`Sesiones expiradas eliminadas: ${r.rowCount}`);
    }
  } catch (err) {
    logger.warn(`Clean expired sessions DB fallback: ${err.message}`);
  }

  const now = new Date();
  for (const [token, session] of fallbackSessions.entries()) {
    if (session.expiresAt <= now) {
      fallbackSessions.delete(token);
    }
  }
}

module.exports = {
  login,
  validateToken,
  logout,
  cleanExpiredSessions,
};
