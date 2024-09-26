const User = require('../models/User'); // Certifique-se de que o caminho está correto

const testTransactions = async (req, res) => {
    const { amount, email } = req.body;

    // Validação básica
    if (amount <= 0) {
        return res.status(400).send('Valor inválido para saque');
    }

    // Simulação de encontrar o usuário (deve ser substituído pela lógica real de busca)
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(404).send('Usuário não encontrado');
    }

    if (user.account < amount) {
        return res.status(400).send('Saldo insuficiente');
    }

    // Lógica para calcular as notas
    const notes = {};
    const availableNotes = [100, 50, 20, 10]; // Notas disponíveis
    let remainingAmount = amount;

    for (const note of availableNotes) {
        while (remainingAmount >= note && user.account >= remainingAmount) {
            if (!notes[note]) notes[note] = 0;
            notes[note]++;
            remainingAmount -= note;
        }
    }

    if (remainingAmount > 0) {
        return res.status(400).send('Não é possível sacar o valor solicitado com as notas disponíveis');
    }

    // Atualiza o saldo do usuário
    user.account -= amount;
    await user.save();

    // Montar a resposta com imagens
    const images = {
        '10': 'nota10.jpg',
        '20': 'nota20.png',
        '50': 'nota50.jpg',
        '100': 'nota100.jpg'
    };

    const response = {
        notes: Object.keys(notes).reduce((acc, note) => {
            if (notes[note] > 0) {
                acc[note] = images[note]; // Retorna o caminho da imagem
            }
            return acc;
        }, {}),
        newAccount: user.account // Saldo restante
    };

    res.status(200).json(response);
};

module.exports = { testTransactions };

