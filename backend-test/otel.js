const fetch = require("node-fetch");
const { env } = process;

const collectorUrl =
  env.OTEL_COLLECTOR_ENDPOINT || "http://localhost:3100/loki/api/v1/push";

async function sendLogBatch(records) {
  try {
    const body = {
      streams: [
        {
          stream: {
            service: env.SERVICE_NAME || "node-test-service"
          },
          values: records.map(record => [
            record.timeUnixNano.toString(),
            record.body.stringValue
          ])
        }
      ]
    };

    await fetch(collectorUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });
  } catch (err) {
    console.error("Failed to send logs:", err.message);
  }
}

module.exports = { sendLogBatch };