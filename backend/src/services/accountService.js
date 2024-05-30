const Account = require('../model/account');
const Operation = require('../model/operation');

const notasDisponiveis = [100, 50, 20, 10];

const calcularNotas = (valor) => {
    const resultado = {};
    for (let nota of notasDisponiveis) {
        if (valor >= nota) {
            resultado[nota] = Math.floor(valor / nota);
            valor %= nota;
        }
    }
    return valor === 0 ? resultado : null;
};

const sacar = async (clienteId, valor) => {
    const conta = await Account.findOne({ clienteId });
    if (!conta) {
        throw new Error('Conta não encontrada');
    }

    if (conta.saldo >= valor) {
        const notas = calcularNotas(valor);
        if (notas) {
            conta.saldo -= valor;
            conta.historicoDeSaques.push({ valor, data: new Date() });
            await conta.save();

            const operacao = new Operation({
                clienteId,
                valor,
                notasEntregues: notas,
                data: new Date()
            });
            await operacao.save();

            return { success: true, notas };
        } else {
            throw new Error('Não é possível sacar esse valor com as notas disponíveis');
        }
    } else {
        throw new Error('Saldo insuficiente');
    }
};

module.exports = {
    sacar
};
