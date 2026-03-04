const express = require('express');
const router = express.Router();
const { logStructured } = require('../logger');

const users = [];

router.get('/health', (req, res) => {
  logStructured('info', 'Health check OK', '/health', { method: req.method });
  res.json({ status: 'ok' });
});

router.get('/users', (req, res) => {
  logStructured('info', 'Fetch users', '/users', { count: users.length });
  res.json(users);
});

router.post('/users', express.json(), (req, res) => {
  const user = req.body || {};
  users.push(user);
  logStructured('info', 'Created user', '/users', { user });
  res.status(201).json(user);
});

router.get('/error', (req, res) => {
  logStructured('error', 'Simulated error occurred', '/error', { detail: 'simulated failure' });
  res.status(500).json({ error: 'simulated error' });
});

module.exports = router;
