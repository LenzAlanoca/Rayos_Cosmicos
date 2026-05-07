/**
 * Servicio de consulta de datos cientificos.
 * Consulta la vista v_eventos_muones y agrega filtros.
 */
const db = require('../config/database');

/**
 * Construye la clausula WHERE dinamicamente.
 */
function buildWhere(filters) {
  const where = [];
  const params = [];
  let i = 1;

  if (filters.id_dispositivo) {
    where.push(`id_dispositivo = $${i++}`);
    params.push(filters.id_dispositivo);
  }
  if (filters.fecha_inicio) {
    where.push(`fecha_hora >= $${i++}`);
    params.push(filters.fecha_inicio);
  }
  if (filters.fecha_fin) {
    where.push(`fecha_hora <= $${i++}`);
    params.push(filters.fecha_fin);
  }

  const whereSql = where.length ? `WHERE ${where.join(' AND ')}` : '';
  return { whereSql, params, nextIdx: i };
}

/**
 * Obtiene los ultimos N eventos (default 100) para el dashboard.
 */
async function getLatest(filters = {}, limit = 100) {
  const { whereSql, params, nextIdx } = buildWhere(filters);
  params.push(limit);
  const r = await db.query(
    `SELECT *
       FROM v_eventos_muones
       ${whereSql}
       ORDER BY fecha_hora DESC
       LIMIT $${nextIdx}`,
    params
  );
  return r.rows;
}

/**
 * Datos historicos paginados.
 */
async function getHistorical(filters = {}, page = 1, pageSize = 50) {
  const offset = (page - 1) * pageSize;
  const { whereSql, params, nextIdx } = buildWhere(filters);

  // count
  const countResult = await db.query(
    `SELECT COUNT(*)::int AS total FROM v_eventos_muones ${whereSql}`,
    params
  );
  const total = countResult.rows[0].total;

  // datos
  params.push(pageSize, offset);
  const dataResult = await db.query(
    `SELECT *
       FROM v_eventos_muones
       ${whereSql}
       ORDER BY fecha_hora DESC
       LIMIT $${nextIdx} OFFSET $${nextIdx + 1}`,
    params
  );

  return {
    page,
    pageSize,
    total,
    totalPages: Math.ceil(total / pageSize),
    data: dataResult.rows,
  };
}

/**
 * Estadisticas globales para el dashboard.
 */
async function getStats(filters = {}) {
  const { whereSql, params } = buildWhere(filters);

  const r = await db.query(
    `SELECT
        COUNT(*)::bigint              AS total_eventos,
        COUNT(DISTINCT id_dispositivo) AS dispositivos_activos,
        AVG(coincidencia_total)::numeric(20,2) AS promedio_total,
        MAX(fecha_hora)               AS ultima_actualizacion
       FROM v_eventos_muones
       ${whereSql}`,
    params
  );
  return r.rows[0];
}

/**
 * Datos agregados por hora (para graficar series temporales suaves).
 */
async function getHourlyAggregation(filters = {}) {
  const { whereSql, params } = buildWhere(filters);
  const r = await db.query(
    `SELECT
        date_trunc('hour', fecha_hora) AS hora,
        id_dispositivo,
        dispositivo,
        AVG(coincidencia_total)::numeric(20,2) AS prom_total,
        AVG(coincidencia_ch1)::numeric(20,2)   AS prom_ch1,
        AVG(coincidencia_ch0_ch2)::numeric(20,2) AS prom_ch0_ch2,
        AVG(raw_ch0)::numeric(20,2) AS prom_raw_ch0,
        AVG(raw_ch1)::numeric(20,2) AS prom_raw_ch1,
        AVG(raw_ch2)::numeric(20,2) AS prom_raw_ch2,
        COUNT(*)::int AS muestras
       FROM v_eventos_muones
       ${whereSql}
       GROUP BY 1, 2, 3
       ORDER BY 1`,
    params
  );
  return r.rows;
}

/**
 * Distribucion total por dispositivo (para grafico tipo dona).
 */
async function getDistribution(filters = {}) {
  const { whereSql, params } = buildWhere(filters);
  const r = await db.query(
    `SELECT
        id_dispositivo,
        dispositivo,
        SUM(coincidencia_total)::bigint AS total
       FROM v_eventos_muones
       ${whereSql}
       GROUP BY 1, 2
       ORDER BY total DESC`,
    params
  );
  return r.rows;
}

/**
 * Recupera todos los valores de un evento puntual (drill-down).
 */
async function getEventDetail(idEvento) {
  const r = await db.query(
    `SELECT vm.id_valor, vm.valor, v.nombre AS variable, v.unidad,
            v.posicion_columna, v.descripcion
       FROM valor_medido vm
       JOIN variable_medida v ON v.id_variable = vm.id_variable
      WHERE vm.id_evento = $1
      ORDER BY v.posicion_columna`,
    [idEvento]
  );
  return r.rows;
}

module.exports = {
  getLatest,
  getHistorical,
  getStats,
  getHourlyAggregation,
  getDistribution,
  getEventDetail,
};
