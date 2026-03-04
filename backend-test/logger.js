const winston = require('winston');
const { sendLogBatch } = require('./otel');
const { env } = process;

const serviceName = env.SERVICE_NAME || 'node-test-service';

const logger = winston.createLogger({
  level: env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message, ...meta }) => {
      const base = { timestamp, level, message, service: serviceName };
      return JSON.stringify(Object.assign(base, meta));
    })
  ),
  transports: [new winston.transports.Console()]
});

async function logStructured(level, message, route, extra = {}) {
  const log = {
    timestamp: new Date().toISOString(),
    severityText: level.toUpperCase(),
    body: message,
    attributes: Object.assign({ route, service: serviceName }, extra)
  };

  // Send to OTEL collector (non-blocking) - commented out for local development
  // sendLogBatch([log]).catch(() => {});

  // Also log locally to console via Winston
  logger.log(level, message, { route, ...extra });
}

module.exports = { logger, logStructured };
