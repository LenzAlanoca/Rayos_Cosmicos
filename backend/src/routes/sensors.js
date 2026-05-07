const express = require('express');
const ctrl = require('../controllers/sensorController');
const { authRequired, requireRole } = require('../middleware/authMiddleware');

const router = express.Router();

// Lecturas: publicas
router.get('/',                ctrl.list);
router.get('/:id',             ctrl.getOne);
router.get('/:id/variables',   ctrl.variables);
router.get('/:id/historial',   ctrl.stateHistory);

// Escrituras: solo ADMIN
router.post('/',     authRequired, requireRole('ADMIN'), ctrl.create);
router.put('/:id',   authRequired, requireRole('ADMIN'), ctrl.update);
router.delete('/:id',authRequired, requireRole('ADMIN'), ctrl.remove);

module.exports = router;
