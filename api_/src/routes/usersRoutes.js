const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

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

    const newUser = new User({
        id: uuidv4(),
        name,
        email,
        user,
        pwd,
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
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id, // O _id do MongoDB é passado diretamente
            { name, email, user, pwd, level, status },
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        res.json(updatedUser);
    } catch (err) {
        res.status(400).json({ error: 'Erro ao atualizar o usuário' });
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