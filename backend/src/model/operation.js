const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OperationSchema = new Schema({
    clienteId: { type: String, required: true },               
    valor: { type: Number, required: true },                   
    notasEntregues: {                                          
        100: { type: Number, default: 0 },
        50: { type: Number, default: 0 },
        20: { type: Number, default: 0 },
        10: { type: Number, default: 0 }
    },
    data: { type: Date, required: true, default: Date.now }   
});

module.exports = mongoose.model('Operation', OperationSchema);
