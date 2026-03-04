// Minimal OpenTelemetry Log exporter setup for OTLP/HTTP.
// Note: As of Node OpenTelemetry, logging SDK is experimental. Here we demonstrate sending
// structured log records via HTTP OTLP using a simple fetch to the collector's OTLP HTTP
// logs endpoint. This keeps the example beginner-friendly without heavy SDK setup.

const fetch = require('node-fetch');
const { env } = process;

const collectorUrl = env.OTEL_COLLECTOR_ENDPOINT || 'http://localhost:4318/v1/logs';

async function sendLogBatch(records) {
  try {
    const body = {
      resourceLogs: [
        {
          resource: { attributes: [{ key: 'service.name', value: { stringValue: env.SERVICE_NAME || 'node-test-service' } }] },
          scopeLogs: [
            {
              scope: {},
              logRecords: records
            }
          ]
        }
      ]
    };

    await fetch(collectorUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
  } catch (err) {
    // Don't crash the app if logs fail to send
    // eslint-disable-next-line no-console
    console.error('Failed to send logs to OTEL collector:', err.message || err);
  }
}

module.exports = { sendLogBatch };
