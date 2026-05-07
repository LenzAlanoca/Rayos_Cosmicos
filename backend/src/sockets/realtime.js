/**
 * Streaming en tiempo real de eventos del detector de muones.
 *
 * Estrategia:
 *  1) Postgres dispara NOTIFY 'nuevo_evento' por cada valor_medido nuevo
 *     (configurado en sql/06_funciones_triggers.sql).
 *  2) Aqui mantenemos un cliente DEDICADO que hace LISTEN nuevo_evento.
 *  3) Por cada notificacion, leemos el evento completo (vista
 *     v_eventos_muones) y lo emitimos por Socket.IO a todos los clientes
 *     conectados al canal "muones".
 *
 * Esto le permite al frontend recibir cada lectura en cuanto se inserta,
 * sin polling.
 */
const { Server } = require('socket.io');
const db = require('../config/database');
const logger = require('../config/logger');

const HEARTBEAT = parseInt(process.env.HEARTBEAT_INTERVAL, 10) || 30000;
const BUFFER_SIZE = parseInt(process.env.EVENT_BUFFER_SIZE, 10) || 200;

// Buffer circular de los ultimos eventos, para que clientes que se conectan
// reciban inmediatamente algo de contexto.
const recentEvents = [];

function pushRecent(ev) {
  recentEvents.push(ev);
  if (recentEvents.length > BUFFER_SIZE) recentEvents.shift();
}

/**
 * Inicializa Socket.IO y la suscripcion LISTEN.
 */
function setup(httpServer) {
  const io = new Server(httpServer, {
    cors: {
      origin: process.env.CORS_ORIGIN || '*',
      methods: ['GET', 'POST'],
    },
    pingInterval: HEARTBEAT,
  });

  // ---- Cliente dedicado a LISTEN/NOTIFY ----
  const listener = db.createListener();

  listener.connect()
    .then(() => listener.query('LISTEN nuevo_evento'))
    .then(() => logger.info('[realtime] Suscrito a NOTIFY nuevo_evento'))
    .catch((err) => logger.error(`[realtime] Error suscribiendo: ${err.message}`));

  listener.on('notification', async (msg) => {
    if (msg.channel !== 'nuevo_evento') return;
    try {
      const payload = JSON.parse(msg.payload);
      // Traemos la fila completa de la vista pivote
      const r = await db.query(
        `SELECT * FROM v_eventos_muones WHERE id_evento = $1`,
        [payload.id_evento]
      );
      const ev = r.rows[0];
      if (!ev) return;
      pushRecent(ev);
      io.to('muones').emit('evento', ev);
      io.to(`dispositivo:${ev.id_dispositivo}`).emit('evento', ev);
    } catch (err) {
      logger.error(`[realtime] Error procesando notificacion: ${err.message}`);
    }
  });

  listener.on('error', (err) => {
    logger.error(`[realtime] Listener error: ${err.message}`);
  });

  // ---- Conexion de clientes Socket.IO ----
  io.on('connection', (socket) => {
    logger.info(`[realtime] Cliente conectado: ${socket.id}`);

    socket.on('subscribe', (room = 'muones') => {
      socket.join(room);
      logger.debug(`[realtime] ${socket.id} se suscribio a ${room}`);
      // Enviar buffer reciente
      socket.emit('buffer', recentEvents);
    });

    socket.on('subscribeDevice', (idDispositivo) => {
      const room = `dispositivo:${idDispositivo}`;
      socket.join(room);
      socket.emit(
        'buffer',
        recentEvents.filter((e) => e.id_dispositivo === idDispositivo)
      );
    });

    socket.on('unsubscribe', (room) => {
      socket.leave(room);
    });

    socket.on('disconnect', () => {
      logger.debug(`[realtime] Cliente desconectado: ${socket.id}`);
    });
  });

  return io;
}

module.exports = { setup };
