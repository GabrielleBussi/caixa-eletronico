const express = require('express');
const server = express();
const mongoose = require('./config/database');
const Account = require('./model/account');
const Operation = require('./model/operation');

server.get('/teste', (req, res) => {
    res.send('MUDEI API!');
});

server.get('/banco', (req, res) => {
    res.json({"state" : mongoose.STATES[mongoose.connection.readyState]});
});

server.listen(3000, () => {
    Account.createCollection().then(function(collection) {
        console.log('Collection is created.');
    })
    
    Operation.createCollection().then(function(collection) {
        console.log('Collection is created.');
    })

    console.log('API ONLINE TESTE');
});


teste