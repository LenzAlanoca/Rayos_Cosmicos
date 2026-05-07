/**
 * Job CLI para ingerir un archivo .log desde la terminal.
 *
 * Uso:
 *   node src/jobs/ingestLog.js --file ./uploads/UMSA_EA_0x2F1_2026.log --dispositivo 1
 *   o:
 *   npm run ingest -- --file ./logs/datos.log --dispositivo 1
 */
const path = require('path');
const ingestionService = require('../services/ingestionService');
const db = require('../config/database');

function parseArgs() {
  const args = process.argv.slice(2);
  const opts = {};
  for (let i = 0; i < args.length; i += 2) {
    const key = args[i].replace(/^--/, '');
    opts[key] = args[i + 1];
  }
  return opts;
}

async function main() {
  const opts = parseArgs();
  if (!opts.file || !opts.dispositivo) {
    console.error('Uso: node src/jobs/ingestLog.js --file <ruta> --dispositivo <id>');
    process.exit(1);
  }

  const filePath = path.resolve(opts.file);
  const idDispositivo = parseInt(opts.dispositivo, 10);

  console.log(`>>> Ingiriendo ${filePath} para dispositivo ${idDispositivo}`);
  const start = Date.now();
  try {
    const result = await ingestionService.ingestFile({
      filePath,
      idDispositivo,
      nombreArchivo: path.basename(filePath),
    });
    const dur = ((Date.now() - start) / 1000).toFixed(2);
    console.log(`>>> Hecho en ${dur}s`);
    console.log(JSON.stringify(result, null, 2));
  } catch (err) {
    console.error(`Error: ${err.message}`);
    process.exitCode = 1;
  } finally {
    await db.close();
  }
}

main();
