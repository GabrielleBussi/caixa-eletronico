const express = require('express');
const mongoose = require('./config/database');
const accountRoutes = require('./routes/index');

const app = express();

app.use(express.json());
app.use('/api', accountRoutes);

const PORT = process.env.PORT || 3000;

mongoose.connection.once('open', () => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});
