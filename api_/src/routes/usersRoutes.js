const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');


/**
 * Define o esquema e o modelo do usuário
 */
const usersSchema = new mongoose.Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    user: { type: String, required: true },
    pwd: { type: String, required: true },
    level: { type: String, required: true },
    status: { type: String, required: true }
});

const User = mongoose.model('Users', usersSchema);

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Endpoints relacionados aos usuários
 */

/**
 * @swagger
 * /users:
 *   get:
 *     tags: [Users]
 *     summary: Retorna todos os usuários
 *     responses:
 *       200:
 *         description: Uma lista de usuários
 */
router.get('/', async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     tags: [Users]
 *     summary: Retorna um usuário específico
 */
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id); // Usando o _id do MongoDB
        if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch user' });
    }
});

/**
 * @swagger
 * /users:
 *   post:
 *     tags: [Users]
 *     summary: Insere um novo usuário
 */
router.post('/', async (req, res) => {
    const { name, email, user, pwd, level, status } = req.body;

    if (!name || !email || !user || !pwd || !level || !status) {
        return res.status(400).json({ erro: 'Todos os campos são obrigatórios' });
    }

    // Criptografando a senha antes de salvar no banco
    const salt = await bcrypt.genSalt(10);  // Gera o "sal" para a senha
    const hashedPwd = await bcrypt.hash(pwd, salt);  // Criptografa a senha

    const newUser = new User({
        id: uuidv4(),
        name,
        email,
        user,
        pwd: hashedPwd,  // Salva a senha criptografada
        level,
        status
    });

    try {
        await newUser.save();
        res.status(200).json({ sucesso: 'Usuário cadastrado com sucesso', id: newUser.id });
    } catch (err) {
        res.status(500).json({ erro: 'Erro ao salvar o usuário' });
    }
});

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     tags: [Users]
 *     summary: Substitui um usuário existente
 */
router.put('/:id', async (req, res) => {
    const { name, email, user, pwd, level, status } = req.body;

    try {
        // Verifica se a senha foi fornecida no corpo da requisição
        const updateData = { name, email, user, level, status };

        // Se a senha foi fornecida, criptografa antes de salvar
        if (pwd) {
            const salt = await bcrypt.genSalt(10);  // Gera o "sal" para a senha
            updateData.pwd = await bcrypt.hash(pwd, salt);  // Criptografa a senha
        }

        // Atualiza o usuário no banco de dados
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id, // Aqui está o _id da URL
            updateData,     // Dados de atualização (incluindo a senha criptografada, se fornecida)
            { new: true, runValidators: true }  // Retorna o novo documento e valida os campos
        );

        if (!updatedUser) {
            return res.status(404).json({ erro: 'Usuário não encontrado' });
        }

        res.json(updatedUser);
    } catch (err) {
        res.status(400).json({ erro: 'Erro ao atualizar o usuário' });
    }
});

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     tags: [Users]
 *     summary: Deleta um usuário existente
 */
router.delete('/:id', async (req, res) => {
    try {
        // A alteração aqui é que estamos agora buscando pelo campo "_id" do MongoDB, não o "id" customizado
        const deletedUser = await User.findByIdAndDelete(req.params.id);

        if (!deletedUser) {
            return res.status(404).json({ erro: 'Usuário não encontrado' });
        }

        res.json({ mensagem: 'Usuário deletado com sucesso.' });
    } catch (err) {
        res.status(500).json({ erro: 'Erro ao deletar o usuário' });
    }
});

module.exports = router;