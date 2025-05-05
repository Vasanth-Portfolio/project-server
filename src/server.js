const app = require('../app');
const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Todo API: http://localhost:${PORT}/api/todos`);
  console.log(`Expense API: http://localhost:${PORT}/api/expense`);
});