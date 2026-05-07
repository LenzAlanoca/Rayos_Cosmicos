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

/**
 * Valida correo + password usando la funcion fn_validar_login()
 * (que internamente usa pgcrypto/bcrypt).
 *
 * Retorna el usuario si las credenciales son correctas, null si no.
 */
async function login(correo, password, ip, userAgent) {
  if (!correo || !password) {
    throw new Error('Correo y contrasena son requeridos');
  }

  // 1) Validar credenciales
  const valid = await db.query(
    'SELECT * FROM fn_validar_login($1, $2)',
    [correo, password]
  );

  if (valid.rows.length === 0) {
    // Registramos intento fallido si el correo existe
    await db.query(
      `INSERT INTO log_sesion (id_usuario, ip_origen, user_agent, exitoso)
       SELECT id_usuario, $2, $3, FALSE FROM usuario WHERE correo = $1`,
      [correo, ip, userAgent]
    );
    return null;
  }

  const user = valid.rows[0];

  // 2) Generar token y guardar sesion
  const token = generateToken();
  const expiresAt = new Date(Date.now() + SESSION_HOURS * 60 * 60 * 1000);

  await db.query(
    `INSERT INTO sesion_activa
       (token, id_usuario, fecha_expiracion, ip_origen, user_agent)
     VALUES ($1, $2, $3, $4, $5)`,
    [token, user.id_usuario, expiresAt, ip, userAgent]
  );

  // 3) Registrar login exitoso
  await db.query(
    `INSERT INTO log_sesion (id_usuario, ip_origen, user_agent, exitoso)
     VALUES ($1, $2, $3, TRUE)`,
    [user.id_usuario, ip, userAgent]
  );

  // 4) Actualizar ultimo_acceso
  await db.query(
    'UPDATE usuario SET ultimo_acceso = NOW() WHERE id_usuario = $1',
    [user.id_usuario]
  );

  logger.info(`Login exitoso: ${user.correo} (rol: ${user.rol})`);

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

/**
 * Valida un token. Devuelve el usuario o null.
 */
async function validateToken(token) {
  if (!token) return null;

  const result = await db.query(
    `SELECT s.token, u.id_usuario, u.nombre, u.correo, u.rol
       FROM sesion_activa s
       JOIN usuario u ON u.id_usuario = s.id_usuario
      WHERE s.token = $1
        AND s.fecha_expiracion > NOW()
        AND u.activo = TRUE`,
    [token]
  );

  if (result.rows.length === 0) return null;

  const row = result.rows[0];
  return {
    id:     row.id_usuario,
    nombre: row.nombre,
    correo: row.correo,
    rol:    row.rol,
  };
}

/**
 * Cierra sesion (elimina el token).
 */
async function logout(token) {
  if (!token) return;
  await db.query('DELETE FROM sesion_activa WHERE token = $1', [token]);
}

/**
 * Limpia sesiones expiradas (llamar periodicamente).
 */
async function cleanExpiredSessions() {
  const r = await db.query(
    'DELETE FROM sesion_activa WHERE fecha_expiracion <= NOW()'
  );
  if (r.rowCount > 0) {
    logger.info(`Sesiones expiradas eliminadas: ${r.rowCount}`);
  }
}

module.exports = {
  login,
  validateToken,
  logout,
  cleanExpiredSessions,
};
