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

        // Resetando os mocks antes de cada teste
        User.findOne.mockReset();
    });

    it('deve retornar a combinação correta de notas para R$ 30', async () => {
        // Mock do retorno do findOne
        User.findOne.mockResolvedValue({ account: 100, save: jest.fn() }); // Mock de um usuário com saldo suficiente
        
        mockReq.body = { email: 'usuario.teste@gmail.com', amount: 30 }; // Incluindo o email
        await testTransactions(mockReq, mockRes); // Aguarde a função assíncrona
        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.json).toHaveBeenCalledWith(expect.objectContaining({ notes: expect.any(Object), newAccount: expect.any(Number) }));
    });

    it('deve retornar erro se o usuário não for encontrado', async () => {
        User.findOne.mockResolvedValue(null); // Simula que o usuário não existe
    
        mockReq.body = { email: 'usuario.inexistente@gmail.com', amount: 30 };
        await testTransactions(mockReq, mockRes);
        
        expect(mockRes.status).toHaveBeenCalledWith(404);
        expect(mockRes.json).toHaveBeenCalledWith({ error: 'Usuário não encontrado' });
    });
    
    it('deve retornar erro se o saldo for insuficiente', async () => {
        User.findOne.mockResolvedValue({ account: 20, save: jest.fn() }); // Saldo insuficiente
    
        mockReq.body = { email: 'usuario.teste@gmail.com', amount: 30 };
        await testTransactions(mockReq, mockRes);
        
        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith({ error: 'Saldo insuficiente ou valor inválido' });
    });
    
    
    it('deve retornar erro se não for possível sacar o valor solicitado com as notas disponíveis', async () => {
        User.findOne.mockResolvedValue({ account: 100, save: jest.fn() });
    
        mockReq.body = { email: 'usuario.teste@gmail.com', amount: 55 }; // Valor que não pode ser sacado
        await testTransactions(mockReq, mockRes);
        
        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith({ error: 'Não é possível sacar o valor solicitado com as notas disponíveis' });
    });

});
