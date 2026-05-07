/**
 * Controlador de datos cientificos.
 */
const dataService = require('../services/dataService');

function extractFilters(req) {
  return {
    id_dispositivo: req.query.id_dispositivo
      ? parseInt(req.query.id_dispositivo, 10)
      : undefined,
    fecha_inicio: req.query.fecha_inicio || undefined,
    fecha_fin:    req.query.fecha_fin    || undefined,
  };
}

async function latest(req, res, next) {
  try {
    const limit = Math.min(parseInt(req.query.limit, 10) || 100, 1000);
    const data = await dataService.getLatest(extractFilters(req), limit);
    res.json({ data });
  } catch (err) { next(err); }
}

async function historical(req, res, next) {
  try {
    const page     = parseInt(req.query.page, 10) || 1;
    const pageSize = Math.min(parseInt(req.query.pageSize, 10) || 50, 500);
    const result = await dataService.getHistorical(extractFilters(req), page, pageSize);
    res.json(result);
  } catch (err) { next(err); }
}

async function stats(req, res, next) {
  try {
    const data = await dataService.getStats(extractFilters(req));
    res.json({ data });
  } catch (err) { next(err); }
}

async function hourly(req, res, next) {
  try {
    const data = await dataService.getHourlyAggregation(extractFilters(req));
    res.json({ data });
  } catch (err) { next(err); }
}

async function distribution(req, res, next) {
  try {
    const data = await dataService.getDistribution(extractFilters(req));
    res.json({ data });
  } catch (err) { next(err); }
}

async function eventDetail(req, res, next) {
  try {
    const data = await dataService.getEventDetail(req.params.id);
    res.json({ data });
  } catch (err) { next(err); }
}

/**
 * Exportacion CSV de datos historicos.
 */
async function exportCsv(req, res, next) {
  try {
    const filters = extractFilters(req);
    const limit = Math.min(parseInt(req.query.limit, 10) || 10000, 100000);
    const rows = await dataService.getLatest(filters, limit);

    const headers = [
      'fecha_hora', 'dispositivo', 'estacion',
      'coincidencia_ch0_ch2', 'coincidencia_ch1', 'coincidencia_total',
      'flag_estado', 'raw_ch0', 'raw_ch1', 'raw_ch2',
    ];

    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', 'attachment; filename="rayos_cosmicos.csv"');
    res.write(headers.join(',') + '\n');

    for (const r of rows) {
      const line = headers.map((h) => {
        const v = r[h];
        if (v === null || v === undefined) return '';
        return String(v).replace(/,/g, ';');
      }).join(',');
      res.write(line + '\n');
    }
    res.end();
  } catch (err) { next(err); }
}

module.exports = {
  latest, historical, stats, hourly, distribution, eventDetail, exportCsv,
};
