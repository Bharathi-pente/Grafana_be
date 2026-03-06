require('dotenv').config();
const express = require('express');
const app = express();
const { logStructured } = require('./logger');
const adminRoutes = require('./routes/adminRoutes');

const PORT = process.env.PORT || 4002;

app.use((req, res, next) => {
  res.setHeader('X-Service-Name', process.env.SERVICE_NAME || 'admin-service');
  next();
});

app.use('/', adminRoutes);

app.use((err, req, res, next) => {
  logStructured('error', 'Unhandled error', req.path, { error: err.message || err });
  res.status(500).json({ error: 'internal error' });
});

app.listen(PORT, () => {
  logStructured('info', `Server started on port ${PORT}`, 'server.js');
  // eslint-disable-next-line no-console
  console.log(`Server running on http://localhost:${PORT}`);
});