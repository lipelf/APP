const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
    title: String,
    date: Date,
    description: String,
    // Adicione outros campos conforme necessário
});

module.exports = mongoose.model('Users', usersSchema);
