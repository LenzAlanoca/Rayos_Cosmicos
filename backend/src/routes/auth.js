const express = require('express');
const ctrl = require('../controllers/authController');
const { authRequired } = require('../middleware/authMiddleware');

const router = express.Router();

// POST /api/auth/login
router.post('/login', ctrl.login);

// POST /api/auth/logout  (requiere sesion)
router.post('/logout', authRequired, ctrl.logout);

// GET  /api/auth/me      (requiere sesion)
router.get('/me', authRequired, ctrl.me);

module.exports = router;
