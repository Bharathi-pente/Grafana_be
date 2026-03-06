const express = require('express');
const router = express.Router();
const { logStructured } = require('../logger');

const customers = [];

router.get('/health', (req, res) => {
  logStructured('info', 'Health check OK', '/health', { method: req.method });
  res.json({ status: 'ok' });
});

router.get('/customers', (req, res) => {
  logStructured('info', 'Fetch customers', '/customers', { count: customers.length });
  res.json(customers);
});

router.post('/customers', express.json(), (req, res) => {
  const customer = req.body || {};
  customers.push(customer);
  logStructured('info', 'Created customer', '/customers', { customer });
  res.status(201).json(customer);
});

router.get('/error', (req, res) => {
  logStructured('error', 'Simulated error occurred', '/error', { detail: 'simulated failure' });
  res.status(500).json({ error: 'simulated error' });
});

module.exports = router;