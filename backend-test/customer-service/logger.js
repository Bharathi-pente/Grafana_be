const winston = require("winston");
const { sendLogBatch } = require("./otel");
const { env } = process;

const serviceName = env.SERVICE_NAME || "node-test-service";

const logger = winston.createLogger({
  level: env.LOG_LEVEL || "info",
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
    timeUnixNano: Date.now() * 1000000,
    severityText: level.toUpperCase(),
    body: { stringValue: message },
    attributes: [
      { key: "route", value: { stringValue: route } },
      { key: "service.name", value: { stringValue: serviceName } }
    ]
  };

  Object.entries(extra).forEach(([key, value]) => {
    log.attributes.push({
      key,
      value: { stringValue: String(value) }
    });
  });

  // ✅ SEND LOGS TO OTEL
  sendLogBatch([log]).catch(() => {});

  // console log
  logger.log(level, message, { route, ...extra });
}

module.exports = { logger, logStructured };