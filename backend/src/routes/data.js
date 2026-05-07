const express = require('express');
const ctrl = require('../controllers/dataController');

const router = express.Router();

// Todas son lecturas: publicas
router.get('/latest',        ctrl.latest);
router.get('/historical',    ctrl.historical);
router.get('/stats',         ctrl.stats);
router.get('/hourly',        ctrl.hourly);
router.get('/distribution',  ctrl.distribution);
router.get('/event/:id',     ctrl.eventDetail);
router.get('/export/csv',    ctrl.exportCsv);

module.exports = router;
