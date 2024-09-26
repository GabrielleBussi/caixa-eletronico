const User = require('../models/User');

exports.testTransactions = async (req, res) => { // Renomeado aqui
    const { email, amount } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    if (user.account < amount || amount <= 0) {
        return res.status(400).json({ error: 'Saldo insuficiente ou valor inválido' });
    }

    const notesAvailable = [100, 50, 20, 10];
    let remainingAmount = amount;
    let notes = {};

    for (let note of notesAvailable) {
        let count = Math.floor(remainingAmount / note);
        if (count > 0) {
            notes[note] = count;
            remainingAmount -= note * count;
        }
    }

    if (remainingAmount > 0) {
        return res.status(400).json({ error: 'Não é possível sacar o valor solicitado com as notas disponíveis' });
    }

    user.account -= amount;
    await user.save();

    res.status(200).json({ notes, newAccount: user.account });
};
