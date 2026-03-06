const express = require('express');
const router = express.Router();
const { logStructured } = require('../logger');
const fetch = require('node-fetch');

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

router.get('/combined', async (req, res) => {
  try {
    const [customersRes, adminsRes] = await Promise.all([
      fetch('http://172.17.0.1:4001/customers'),
      fetch('http://172.17.0.1:4002/admins')
    ]);
    const customers = await customersRes.json();
    const admins = await adminsRes.json();
    logStructured('info', 'Fetched combined data', '/combined', { usersCount: users.length, customersCount: customers.length, adminsCount: admins.length });
    res.json({ users, customers, admins });
  } catch (err) {
    logStructured('error', 'Error fetching combined data', '/combined', { error: err.message });
    res.status(500).json({ error: 'Failed to fetch combined data' });
  }
});

router.get('/error', (req, res) => {
  logStructured('error', 'Simulated error occurred', '/error', { detail: 'simulated failure' });
  res.status(500).json({ error: 'simulated error' });
});

module.exports = router;
