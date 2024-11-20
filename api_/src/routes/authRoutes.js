const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User'); // Supondo que você tenha um modelo de usuário

const router = express.Router();

// Rota de login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    // Verifique a senha
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Senha incorreta' });
    }

    // Retorna os dados do usuário
    res.json({
      email: user.email,
      name: user.name,
      // Adicione outros campos conforme necessário
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro no servidor' });
  }
});

module.exports = router;
