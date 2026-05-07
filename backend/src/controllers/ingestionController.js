/**
 * Controlador de ingestion de archivos .log.
 */
const ingestionService = require('../services/ingestionService');

async function uploadFile(req, res, next) {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Archivo requerido (campo "archivo")' });
    }
    const idDispositivo = parseInt(req.body.id_dispositivo, 10);
    if (!idDispositivo) {
      return res.status(400).json({ error: 'id_dispositivo es requerido' });
    }

    const result = await ingestionService.ingestFile({
      filePath:       req.file.path,
      idDispositivo,
      nombreArchivo:  req.file.originalname,
    });
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
}

module.exports = { uploadFile };
