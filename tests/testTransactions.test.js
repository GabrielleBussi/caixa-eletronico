const { testTransactions } = require('../controllers/transactionController');
const User = require('../models/User');

jest.mock('../models/User');

describe('testTransactions', () => {
    let mockReq, mockRes;

    beforeEach(() => {
        mockReq = {};
        mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            send: jest.fn()
        };

        User.findOne.mockReset();
    });

    it('deve retornar a combinação correta de notas para R$ 30', async () => {
        User.findOne.mockResolvedValue({ account: 100, save: jest.fn() });
        
        mockReq.body = { email: 'usuario.teste@gmail.com', amount: 30 };
        await testTransactions(mockReq, mockRes);
        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.json).toHaveBeenCalledWith(expect.objectContaining({ notes: expect.any(Object), newAccount: expect.any(Number) }));
    });

    it('deve retornar erro se o usuário não for encontrado', async () => {
        User.findOne.mockResolvedValue(null);
    
        mockReq.body = { email: 'usuario.inexistente@gmail.com', amount: 30 };
        await testTransactions(mockReq, mockRes);
        
        expect(mockRes.status).toHaveBeenCalledWith(404);
        expect(mockRes.json).toHaveBeenCalledWith({ error: 'Usuário não encontrado' });
    });
    
    it('deve retornar erro se o saldo for insuficiente', async () => {
        User.findOne.mockResolvedValue({ account: 20, save: jest.fn() });
    
        mockReq.body = { email: 'usuario.teste@gmail.com', amount: 30 };
        await testTransactions(mockReq, mockRes);
        
        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith({ error: 'Saldo insuficiente ou valor inválido' });
    });
    
    
    it('deve retornar erro se não for possível sacar o valor solicitado com as notas disponíveis', async () => {
        User.findOne.mockResolvedValue({ account: 100, save: jest.fn() });
    
        mockReq.body = { email: 'usuario.teste@gmail.com', amount: 55 };
        await testTransactions(mockReq, mockRes);
        
        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith({ error: 'Não é possível sacar o valor solicitado com as notas disponíveis' });
    });

});
