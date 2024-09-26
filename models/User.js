const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    account: {
        type: Number,
        required: true,
        default: 10000
    }
});

module.exports = mongoose.model('User', userSchema);
