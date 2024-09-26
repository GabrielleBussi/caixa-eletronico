const express = require('express');
const { testTransactions } = require('../controllers/transactionController');
const router = express.Router();

router.post('/withdraw', testTransactions);

module.exports = router;
