/**
 * Server-Sent Events (SSE) - alternativa simple a Socket.IO.
 *
 * El frontend puede consumirlo directamente con EventSource:
 *   const es = new EventSource('http://localhost:3000/api/stream/eventos');
 *   es.onmessage = (e) => { const ev = JSON.parse(e.data); ... };
 *
 * Cada cliente SSE se registra en un Set; cuando llega una notificacion
 * de Postgres, se reenvia a todos los clientes activos.
 */
const express = require('express');
const db = require('../config/database');
const logger = require('../config/logger');

const router = express.Router();

const clients = new Set();
let listenerStarted = false;

function startListener() {
  if (listenerStarted) return;
  listenerStarted = true;

  const listener = db.createListener();
  listener.connect()
    .then(() => listener.query('LISTEN nuevo_evento'))
    .then(() => logger.info('[sse] Suscrito a NOTIFY nuevo_evento'))
    .catch((err) => logger.error(`[sse] Error: ${err.message}`));

  listener.on('notification', async (msg) => {
    if (msg.channel !== 'nuevo_evento') return;
    try {
      const payload = JSON.parse(msg.payload);
      const r = await db.query(
        'SELECT * FROM v_eventos_muones WHERE id_evento = $1',
        [payload.id_evento]
      );
      const ev = r.rows[0];
      if (!ev) return;
      const data = `data: ${JSON.stringify(ev)}\n\n`;
      for (const res of clients) {
        try { res.write(data); } catch { /* cliente caido */ }
      }
    } catch (err) {
      logger.error(`[sse] notif err: ${err.message}`);
    }
  });
}

router.get('/eventos', (req, res) => {
  startListener();

  res.setHeader('Content-Type',  'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection',    'keep-alive');
  res.setHeader('X-Accel-Buffering', 'no');
  res.flushHeaders();

  // saludo inicial
  res.write(`event: hello\ndata: {"ok":true}\n\n`);

  clients.add(res);
  logger.info(`[sse] cliente conectado (total: ${clients.size})`);

  // heartbeat cada 30s para evitar que proxies cierren la conexion
  const hb = setInterval(() => {
    try { res.write(': hb\n\n'); } catch { /* noop */ }
  }, 30000);

  req.on('close', () => {
    clearInterval(hb);
    clients.delete(res);
    logger.info(`[sse] cliente desconectado (quedan: ${clients.size})`);
  });
});

module.exports = router;
