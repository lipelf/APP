const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const LoginUsuarios = require('../models/loginUsuarios'); // Caminho correto
// Conectar ao banco de dados MongoDB
const connectDB = async () => {
  try {
    // Substitua pela URL do MongoDB com o banco correto
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/login', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Conectado ao MongoDB!');
  } catch (error) {
    console.error('Erro ao conectar ao MongoDB:', error);
    process.exit(1);
  }
};

// Função para criar o usuário
const createUser = async (name, email, password) => {
  await connectDB(); // Conectar ao banco de dados

  // Gerar o hash da senha
  const hashedPassword = bcrypt.hashSync(password, 10);

  // Criar o novo usuário
  const newUser = new LoginUsuarios({
    name,
    email,
    password: hashedPassword,
    createdAt: new Date(),
  });

  // Salvar o usuário no banco de dados
  try {
    await newUser.save();
    console.log('Usuário criado com sucesso!');
    mongoose.disconnect();
  } catch (error) {
    console.error('Erro ao criar o usuário:', error);
    mongoose.disconnect();
  }
};

// Chamar a função createUser para adicionar um usuário
const name = 'John Doe'; // Nome do usuário
const email = 'john@example.com'; // Email do usuário
const password = 'password123'; // Senha do usuário

createUser(name, email, password);
