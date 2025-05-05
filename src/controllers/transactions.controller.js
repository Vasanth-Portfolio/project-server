let transactions = [
    { id: 1, description: 'Salary', amount: 3000, type: 'income', date: '2023-05-01', category: 'Salary' },
    { id: 2, description: 'Rent', amount: 1000, type: 'expense', date: '2023-05-02', category: 'Housing' }
  ];
  
  function calculateBalance() {
    const income = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    
    const expenses = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
    
    return income - expenses;
  }
  
  exports.getTransactions = (req, res) => {
    res.json({ success: true, data: transactions, balance: calculateBalance() });
  };
  
  exports.getTransaction = (req, res) => {
    const transaction = transactions.find(t => t.id === parseInt(req.params.id));
    if (!transaction) return res.status(404).json({ success: false, error: 'Transaction not found' });
    res.json({ success: true, data: transaction });
  };
  
  exports.createTransaction = (req, res) => {
    if (!req.body.description || !req.body.amount || !req.body.type || !req.body.category) {
      return res.status(400).json({
        success: false,
        error: 'Description, amount, type, and category are required'
      });
    }
  
    const newTransaction = {
      id: transactions.length > 0 ? Math.max(...transactions.map(t => t.id)) + 1 : 1,
      description: req.body.description,
      amount: parseFloat(req.body.amount),
      type: req.body.type,
      date: req.body.date || new Date().toISOString().split('T')[0],
      category: req.body.category
    };
  
    transactions.push(newTransaction);
    res.status(201).json({ success: true, data: newTransaction, balance: calculateBalance() });
  };
  
  exports.updateTransaction = (req, res) => {
    const transaction = transactions.find(t => t.id === parseInt(req.params.id));
    if (!transaction) return res.status(404).json({ success: false, error: 'Transaction not found' });
    
    transaction.description = req.body.description || transaction.description;
    transaction.amount = req.body.amount !== undefined ? parseFloat(req.body.amount) : transaction.amount;
    transaction.type = req.body.type || transaction.type;
    transaction.date = req.body.date || transaction.date;
    transaction.category = req.body.category || transaction.category;
    
    res.json({ success: true, data: transaction, balance: calculateBalance() });
  };
  
  exports.deleteTransaction = (req, res) => {
    const index = transactions.findIndex(t => t.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ success: false, error: 'Transaction not found' });
    
    const deletedTransaction = transactions.splice(index, 1)[0];
    res.json({ 
      success: true, 
      data: deletedTransaction, 
      balance: calculateBalance(),
      message: 'Transaction removed' 
    });
  };
  
  exports.getBalance = (req, res) => {
    res.json({ success: true, balance: calculateBalance() });
  };