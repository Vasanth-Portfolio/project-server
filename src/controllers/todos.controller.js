let todos = [
    { id: 1, title: 'Learn Express', completed: false },
    { id: 2, title: 'Build Todo API', completed: false }
  ];
  
  exports.getTodos = (req, res) => {
    res.json({ success: true, data: todos });
  };
  
  exports.getTodo = (req, res) => {
    const todo = todos.find(t => t.id === parseInt(req.params.id));
    if (!todo) return res.status(404).json({ success: false, error: 'Todo not found' });
    res.json({ success: true, data: todo });
  };
  
  exports.createTodo = (req, res) => {
    if (!req.body.title) {
      return res.status(400).json({ success: false, error: 'Title is required' });
    }
  
    const newTodo = {
      id: todos.length > 0 ? Math.max(...todos.map(t => t.id)) + 1 : 1,
      title: req.body.title,
      completed: req.body.completed || false
    };
  
    todos.push(newTodo);
    res.status(201).json({ success: true, data: newTodo });
  };
  
  exports.updateTodo = (req, res) => {
    const todo = todos.find(t => t.id === parseInt(req.params.id));
    if (!todo) return res.status(404).json({ success: false, error: 'Todo not found' });
    
    todo.title = req.body.title || todo.title;
    todo.completed = req.body.completed !== undefined ? req.body.completed : todo.completed;
    
    res.json({ success: true, data: todo });
  };
  
  exports.deleteTodo = (req, res) => {
    const index = todos.findIndex(t => t.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ success: false, error: 'Todo not found' });
    
    const deletedTodo = todos.splice(index, 1)[0];
    res.json({ success: true, data: deletedTodo, message: 'Todo removed' });
  };