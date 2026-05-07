/**
 * Configuracion de la aplicacion Express.
 */
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const path = require('path');
const fs = require('fs');

const logger = require('./config/logger');
const { errorHandler, notFoundHandler } = require('./middleware/errorHandler');

const authRoutes      = require('./routes/auth');
const sensorRoutes    = require('./routes/sensors');
const dataRoutes      = require('./routes/data');
const ingestionRoutes = require('./routes/ingestion');
const streamRoutes    = require('./routes/stream');

const app = express();

// ----- Middlewares globales -----
app.use(helmet({
  // Permitimos cross-origin a recursos para que el frontend pueda usarlos
  crossOriginResourcePolicy: { policy: 'cross-origin' },
}));

app.use(cors({
  origin: (process.env.CORS_ORIGIN || 'http://localhost:5173').split(','),
  credentials: true,
}));

app.use(compression());
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('combined', {
  stream: { write: (m) => logger.info(m.trim()) },
}));

// Asegurar que existe el directorio de uploads
const uploadDir = process.env.UPLOAD_DIR || './uploads';
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

// ----- Rutas -----
app.get('/api/health', (req, res) => {
  res.json({
    status:    'ok',
    name:      process.env.APP_NAME    || 'Rayos Cosmicos Backend',
    version:   process.env.APP_VERSION || '1.0.0',
    timestamp: new Date().toISOString(),
  });
});

app.use('/api/auth',     authRoutes);
app.use('/api/sensors',  sensorRoutes);
app.use('/api/data',     dataRoutes);
app.use('/api/ingest',   ingestionRoutes);
app.use('/api/stream',   streamRoutes);

// ----- Error handlers -----
app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
