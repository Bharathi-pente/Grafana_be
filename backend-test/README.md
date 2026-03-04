# backend-test

Simple Node.js + Express backend for testing structured logs with OpenTelemetry Collector -> Loki -> Grafana.

Prerequisites
- Node.js 18+ installed
- OpenTelemetry Collector reachable at `OTEL_COLLECTOR_ENDPOINT` (default in `.env`)

Install

```bash
cd backend-test
npm install
```

Run

```bash
npm start
```

APIs

- GET /health
- GET /users
- POST /users (JSON body)
- GET /error

Example curl

```bash
curl http://localhost:3000/health
curl http://localhost:3000/users
curl -X POST http://localhost:3000/users -H "Content-Type: application/json" -d '{"name":"alice"}'
curl http://localhost:3000/error
```

Notes
- Logs are printed to console and also sent to OTLP HTTP endpoint configured in `.env` using a minimal JSON format compatible with collector.
- `service.name` is set from `.env` or defaults to `node-test-service`.
