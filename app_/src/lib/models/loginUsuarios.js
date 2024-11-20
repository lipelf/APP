const mongoose = require('mongoose');
const LoginUsuariosSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// O nome da coleção pode ser alterado aqui se necessário
const LoginUsuarios = mongoose.model('usuarios', LoginUsuariosSchema);


module.exports = LoginUsuarios;

