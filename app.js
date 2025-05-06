require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const todoRoutes = require('./src/routes/todos.routes');
const expenseRoutes = require('./src/routes/transactions.routes');

const app = express();

const corsOptions = {
  origin: [
    'http://localhost:5173',
    "https://vasanth.website",
    'https://project-server-rs8l.onrender.com' 
  ],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.options('*', cors(corsOptions)); 

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