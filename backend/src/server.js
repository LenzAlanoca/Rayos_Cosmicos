/**
 * Punto de entrada del backend.
 * Levanta HTTP + Socket.IO y agenda tareas periodicas.
 */
require('dotenv').config();
const http = require('http');

const app = require('./app');
const logger = require('./config/logger');
const realtime = require('./sockets/realtime');
const authService = require('./services/authService');
const db = require('./config/database');

const PORT = parseInt(process.env.PORT, 10) || 3000;
const HOST = process.env.HOST || '0.0.0.0';

const server = http.createServer(app);

// Inicializar streaming en tiempo real
realtime.setup(server);

// Limpieza periodica de sesiones expiradas (cada 30 min)
setInterval(() => {
  authService.cleanExpiredSessions().catch((err) =>
    logger.error(`Error limpiando sesiones: ${err.message}`)
  );
}, 30 * 60 * 1000);

server.listen(PORT, HOST, () => {
  logger.info(`>>> Backend Rayos Cosmicos corriendo en http://${HOST}:${PORT}`);
  logger.info(`>>> Health check:  http://${HOST}:${PORT}/api/health`);
  logger.info(`>>> SSE stream:    http://${HOST}:${PORT}/api/stream/eventos`);
  logger.info(`>>> Socket.IO en:  http://${HOST}:${PORT}`);
});

// Cierre limpio
async function shutdown(signal) {
  logger.info(`Recibido ${signal}, cerrando servidor...`);
  server.close(async () => {
    try {
      await db.close();
      logger.info('Servidor cerrado correctamente');
      process.exit(0);
    } catch (err) {
      logger.error(`Error al cerrar: ${err.message}`);
      process.exit(1);
    }
  });
  // forzar salida tras 10s
  setTimeout(() => process.exit(1), 10000).unref();
}

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT',  () => shutdown('SIGINT'));

process.on('unhandledRejection', (reason) => {
  logger.error(`Unhandled rejection: ${reason}`);
});
process.on('uncaughtException', (err) => {
  logger.error(`Uncaught exception: ${err.message}`);
  logger.error(err.stack);
});
