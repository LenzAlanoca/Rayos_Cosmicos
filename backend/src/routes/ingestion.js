const express = require('express');
const multer = require('multer');
const path = require('path');
const ctrl = require('../controllers/ingestionController');
const { authRequired, requireRole } = require('../middleware/authMiddleware');

const router = express.Router();

const UPLOAD_DIR = process.env.UPLOAD_DIR || './uploads';

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOAD_DIR),
  filename:    (req, file, cb) => {
    const safe = file.originalname.replace(/[^a-zA-Z0-9._-]/g, '_');
    cb(null, `${Date.now()}_${safe}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 200 * 1024 * 1024 }, // 200 MB
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (['.log', '.txt', '.csv'].includes(ext)) cb(null, true);
    else cb(new Error('Solo se permiten archivos .log, .txt o .csv'));
  },
});

// Subir archivo .log para ingerir (solo ADMIN/OPERADOR)
router.post(
  '/upload',
  authRequired,
  requireRole('ADMIN', 'OPERADOR'),
  upload.single('archivo'),
  ctrl.uploadFile
);

module.exports = router;
