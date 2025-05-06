const app = require('../app.js');
const PORT = process.env.PORT || 5000;

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Todo API: http://localhost:${PORT}/api/todos`);
  console.log(`Expense API: http://localhost:${PORT}/api/expense`);
});