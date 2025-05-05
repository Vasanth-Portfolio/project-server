require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const todoRoutes = require('./src/routes/todos.routes');
const expenseRoutes = require('./src/routes/transactions.routes');

const app = express();

app.use(cors({ origin: process.env.CORS_ORIGIN }));
app.use(bodyParser.json());

// Routes
app.use('/api/todos', todoRoutes);
app.use('/api/expense', expenseRoutes);

app.get('/', (req, res) => {
  res.json({
    status: 'running',
    services: {
      todo: '/api/todos',
      expense: '/api/expense'
    }
  });
});

app.use((req, res) => {
  res.status(404).json({ success: false, error: 'Endpoint not found' });
});

module.exports = app;