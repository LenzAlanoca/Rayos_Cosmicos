/**
 * Controlador de dispositivos / sensores.
 */
const sensorService = require('../services/sensorService');

async function list(req, res, next) {
  try {
    const data = await sensorService.listAll();
    res.json({ data });
  } catch (err) { next(err); }
}

async function getOne(req, res, next) {
  try {
    const data = await sensorService.getById(req.params.id);
    if (!data) return res.status(404).json({ error: 'No encontrado' });
    res.json({ data });
  } catch (err) { next(err); }
}

async function create(req, res, next) {
  try {
    const created = await sensorService.create(req.body);
    res.status(201).json({ data: created });
  } catch (err) { next(err); }
}

async function update(req, res, next) {
  try {
    const updated = await sensorService.update(req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: 'No encontrado' });
    res.json({ data: updated });
  } catch (err) { next(err); }
}

async function remove(req, res, next) {
  try {
    await sensorService.remove(req.params.id);
    res.json({ ok: true });
  } catch (err) { next(err); }
}

async function variables(req, res, next) {
  try {
    const data = await sensorService.getVariables(req.params.id);
    res.json({ data });
  } catch (err) { next(err); }
}

async function stateHistory(req, res, next) {
  try {
    const limit = parseInt(req.query.limit, 10) || 50;
    const data = await sensorService.getStateHistory(req.params.id, limit);
    res.json({ data });
  } catch (err) { next(err); }
}

module.exports = { list, getOne, create, update, remove, variables, stateHistory };
