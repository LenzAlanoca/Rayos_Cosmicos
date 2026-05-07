/**
 * Manejador centralizado de errores.
 */
const logger = require('../config/logger');

function errorHandler(err, req, res, next) {  // eslint-disable-line no-unused-vars
  logger.error(`${req.method} ${req.url} - ${err.message}`);
  if (process.env.NODE_ENV === 'development') {
    logger.error(err.stack);
  }

  const status = err.status || err.statusCode || 500;
  res.status(status).json({
    error: err.message || 'Error interno del servidor',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
}

function notFoundHandler(req, res) {
  res.status(404).json({ error: `Ruta no encontrada: ${req.method} ${req.url}` });
}

module.exports = { errorHandler, notFoundHandler };
