const mongoose = require('mongoose');

const teachersSchema = new mongoose.Schema({
    title: String,
    date: Date,
    description: String,
    // Adicione outros campos conforme necessário
});

module.exports = mongoose.model('Teachers', teachersSchema);
