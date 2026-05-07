/**
 * Middleware de autenticacion BASICO.
 * Lee el header  Authorization: Bearer <token>  y valida la sesion.
 *
 * Cuando se cambie a JWT, solo se reemplaza el cuerpo de authRequired().
 */
const authService = require('../services/authService');

/**
 * Extrae el token del header Authorization.
 */
function extractToken(req) {
  const header = req.headers.authorization || '';
  if (!header.startsWith('Bearer ')) return null;
  return header.substring(7).trim();
}

/**
 * Bloquea la request si no hay sesion valida.
 */
async function authRequired(req, res, next) {
  try {
    const token = extractToken(req);
    if (!token) {
      return res.status(401).json({ error: 'Token requerido' });
    }
    const user = await authService.validateToken(token);
    if (!user) {
      return res.status(401).json({ error: 'Token invalido o expirado' });
    }
    req.user = user;
    req.token = token;
    next();
  } catch (err) {
    next(err);
  }
}

/**
 * Bloquea si el usuario no tiene uno de los roles permitidos.
 * Uso:  router.delete('/x', authRequired, requireRole('ADMIN'), handler)
 */
function requireRole(...roles) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'No autenticado' });
    }
    if (!roles.includes(req.user.rol)) {
      return res.status(403).json({
        error: 'No autorizado',
        rolRequerido: roles,
        rolActual:    req.user.rol,
      });
    }
    next();
  };
}

/**
 * Inyecta req.user si hay token, pero NO bloquea si no lo hay.
 * Util para endpoints publicos que cambian de comportamiento si hay sesion.
 */
async function authOptional(req, res, next) {
  try {
    const token = extractToken(req);
    if (token) {
      const user = await authService.validateToken(token);
      if (user) {
        req.user = user;
        req.token = token;
      }
    }
    next();
  } catch (err) {
    next(err);
  }
}

module.exports = { authRequired, requireRole, authOptional, extractToken };
