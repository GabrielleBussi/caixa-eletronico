const { testTransactions } = require('../controllers/transactionController');
const User = require('../models/User');

jest.mock('../models/User');

describe('testTransactions', () => {
    let mockReq, mockRes;

    beforeEach(() => {
        mockReq = {
            body: {
                amount: 100,
                email: 'usuario.teste@gmail.com'
            }
        };

        mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            send: jest.fn()
        };
    });

    it('deve retornar erro para usuário não encontrado', async () => {
        User.findOne.mockResolvedValue(null); 
        await testTransactions(mockReq, mockRes);
        expect(mockRes.status).toHaveBeenCalledWith(404);
        expect(mockRes.send).toHaveBeenCalledWith('Usuário não encontrado');
    });

    it('deve retornar erro para valor inválido', async () => {
        mockReq.body.amount = -50; 
        await testTransactions(mockReq, mockRes);
        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.send).toHaveBeenCalledWith('Valor inválido para saque');
    });

    it('deve retornar erro para saldo insuficiente', async () => {
        User.findOne.mockResolvedValue({ account: 50, save: jest.fn() });
        await testTransactions(mockReq, mockRes);
        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.send).toHaveBeenCalledWith('Saldo insuficiente');
    });

    it('deve retornar sucesso para um saque válido', async () => {
        User.findOne.mockResolvedValue({ account: 200, save: jest.fn() });
        await testTransactions(mockReq, mockRes);
        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.json).toHaveBeenCalledWith({
            notes: { '100': 'nota100.jpg' },
            newAccount: 100
        });
    });

    it('deve retornar a combinação correta de notas para R$ 30', async () => {
        User.findOne.mockResolvedValue({ account: 1000, save: jest.fn() });
        mockReq.body.amount = 30;
        await testTransactions(mockReq, mockRes);
        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.json).toHaveBeenCalledWith({
            notes: { '20': 'nota20.png', '10': 'nota10.jpg' },
            newAccount: 970
        });
    });

    it('deve retornar a combinação correta de notas para R$ 80', async () => {
        User.findOne.mockResolvedValue({ account: 1000, save: jest.fn() });
        mockReq.body.amount = 80;
        await testTransactions(mockReq, mockRes);
        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.json).toHaveBeenCalledWith({
            notes: { '50': 'nota50.jpg', '20': 'nota20.png', '10': 'nota10.jpg' },
            newAccount: 920
        });
    });
});
