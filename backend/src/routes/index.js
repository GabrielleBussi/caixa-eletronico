const express = require('express');
const { realizarSaque } = require('../controller/accountController');

const router = express.Router();

router.post('/sacar', realizarSaque);

module.exports = router;
