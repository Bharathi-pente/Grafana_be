const express = require('express');
const router = express.Router();
const { logStructured } = require('../logger');

const admins = [];

router.get('/health', (req, res) => {
  logStructured('info', 'Health check OK', '/health', { method: req.method });
  res.json({ status: 'ok' });
});

router.get('/admins', (req, res) => {
  logStructured('info', 'Fetch admins', '/admins', { count: admins.length });
  res.json(admins);
});

router.post('/admins', express.json(), (req, res) => {
  const admin = req.body || {};
  admins.push(admin);
  logStructured('info', 'Created admin', '/admins', { admin });
  res.status(201).json(admin);
});

router.get('/error', (req, res) => {
  logStructured('error', 'Simulated error occurred', '/error', { detail: 'simulated failure' });
  res.status(500).json({ error: 'simulated error' });
});

module.exports = router;