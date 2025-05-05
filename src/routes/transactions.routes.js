const express = require('express');
const router = express.Router();
const {
  getTransactions,
  getTransaction,
  createTransaction,
  updateTransaction,
  deleteTransaction,
  getBalance
} = require('../controllers/transactions.controller');

router.get('/', getTransactions);
router.get('/:id', getTransaction);
router.post('/', createTransaction);
router.put('/:id', updateTransaction);
router.delete('/:id', deleteTransaction);
router.get('/balance', getBalance);

module.exports = router;