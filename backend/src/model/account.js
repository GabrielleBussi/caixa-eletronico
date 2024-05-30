const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AccountSchema = new Schema({
    clienteId: { type: String, required: true, unique: true }, 
    saldo: { type: Number, required: true, default: 10000 },   
    historicoDeSaques: [{
        valor: { type: Number, required: true },
        data: { type: Date, required: true, default: Date.now }
    }]
});

module.exports = mongoose.model('Account', AccountSchema);
