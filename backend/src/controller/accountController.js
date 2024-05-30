const { sacar } = require('../services/accountService');

const realizarSaque = async (req, res) => {
    try {
        const { clienteId, valor } = req.body;
        const resultado = await sacar(clienteId, valor);
        res.status(200).json({ notas: resultado.notas });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    realizarSaque
};
