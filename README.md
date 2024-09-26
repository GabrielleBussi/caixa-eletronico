# Nome do Projeto: Caixa Eletrônico

Este é um simulador de caixa eletrônico que permite ao usuário realizar saques, recebendo o valor solicitado em notas disponíveis.

## Pré-requisitos

Para executar este projeto, é necessário ter as seguintes ferramentas instaladas em sua máquina:
- **Node.js**
- **npm**
- **MongoDB**

## Passos para execução

1. Clonar o repositório:
   `git clone https://github.com/GabrielleBussi/caixa-eletronico.git`

2. Instalar as dependências do projeto:
   `npm install`

3. Configuração do banco de dados MongoDB:
   - Crie um banco de dados com o nome **saque**.
   - No banco de dados **saque**, crie uma coleção chamada **users**.
   - Adicione pelo menos um usuário à coleção. Apenas e-mails cadastrados serão aceitos no sistema. E-mails não cadastrados resultarão em uma mensagem de erro.

4. Campos obrigatórios para a coleção users:
   - **email**: deve conter um e-mail válido do usuário.
   - **account**: representa o saldo disponível do usuário e deve ser um valor inteiro maior que zero. Exemplo: 10000.

## Executando o servidor

Inicie o servidor com o seguinte comando: 
`npm start`

## Acessando o sistema

Abra o navegador e acesse: [http://localhost:3000](http://localhost:3000).

## Como utilizar

1. Insira seu e-mail no campo apropriado.
2. Digite o valor que deseja sacar.
3. Clique em **Sacar** para visualizar as notas disponibilizadas e o saldo atualizado.

## Para mais informações

Entre em contato através do e-mail: [gabrielle.olibussi@gmail.com](gabrielle.olibussi@gmail.com).
