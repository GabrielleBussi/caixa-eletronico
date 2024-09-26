require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const transactionRoutes = require('./routes/transactionRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

const mongoListener = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB);
        console.log('MongoDB connected');
    } catch (err) {
        console.error('Erro ao conectar ao MongoDB:', err);
        process.exit(1);
    }
};

app.use(express.json());
app.use(cors());
app.use(express.static('public'));

app.use('/api/transactions', transactionRoutes);

app.use('*', (req, res) => res.status(404).send('Página não encontrada'));

mongoListener().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});
