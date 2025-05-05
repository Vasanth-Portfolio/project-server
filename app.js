const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.json());

let todos = [
  { id: 1, title: 'Learn Express', completed: false },
  { id: 2, title: 'Build Todo API', completed: false }
];

app.get('/api/todos', (req, res) => {
  res.json({
    success: true,
    data: todos
  });
});

app.get('/api/todos/:id', (req, res) => {
  const todo = todos.find(t => t.id === parseInt(req.params.id));
  if (!todo) return res.status(404).json({ 
    success: false,
    error: 'Todo not found' 
  });
  res.json({
    success: true,
    data: todo
  });
});

// Create new todo
app.post('/api/todos', (req, res) => {
  if (!req.body.title) {
    return res.status(400).json({
      success: false,
      error: 'Title is required'
    });
  }

  const newTodo = {
    id: todos.length > 0 ? Math.max(...todos.map(t => t.id)) + 1 : 1,
    title: req.body.title,
    completed: req.body.completed || false
  };
  todos.push(newTodo);
  res.status(201).json({
    success: true,
    data: newTodo
  });
});

// Update todo
app.put('/api/todos/:id', (req, res) => {
  const todo = todos.find(t => t.id === parseInt(req.params.id));
  if (!todo) return res.status(404).json({ 
    success: false,
    error: 'Todo not found' 
  });
  
  todo.title = req.body.title || todo.title;
  todo.completed = req.body.completed !== undefined ? req.body.completed : todo.completed;
  
  res.json({
    success: true,
    data: todo
  });
});

// Delete todo
app.delete('/api/todos/:id', (req, res) => {
  const index = todos.findIndex(t => t.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ 
    success: false,
    error: 'Todo not found' 
  });
  
  todos.splice(index, 1);
  res.json({ 
    success: true,
    message: 'Todo removed' 
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));