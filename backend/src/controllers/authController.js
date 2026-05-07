/**
 * Controlador de autenticacion (login basico).
 */
const authService = require('../services/authService');

async function login(req, res, next) {
  try {
    const { correo, password } = req.body || {};
    const ip = req.ip;
    const userAgent = req.headers['user-agent'];

    const result = await authService.login(correo, password, ip, userAgent);

    if (!result) {
      return res.status(401).json({ error: 'Credenciales invalidas' });
    }
    res.json(result);
  } catch (err) {
    next(err);
  }
}

async function logout(req, res, next) {
  try {
    await authService.logout(req.token);
    res.json({ ok: true, message: 'Sesion cerrada' });
  } catch (err) {
    next(err);
  }
}

async function me(req, res) {
  res.json({ user: req.user });
}

module.exports = { login, logout, me };
