const express = require('express');
const { testTransactions } = require('../controllers/transactionController'); // Verifique se o nome está correto
const router = express.Router();

router.post('/withdraw', testTransactions); // Certifique-se de que a função existe

module.exports = router;
