
const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    title: String,
    date: Date,
    description: String,
    // Adicione outros campos conforme necessário
});

module.exports = mongoose.model('Appointment', appointmentSchema);
