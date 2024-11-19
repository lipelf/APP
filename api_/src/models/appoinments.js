const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

// Definindo o esquema do agendamento
const appointmentSchema = new mongoose.Schema({
    id: { type: String, required: true },  // ID gerado manualmente com uuidv4
    specialty: { type: String, required: true },
    comments: { type: String, required: true },
    date: { type: Date, required: true },
    student: { type: String, required: true },
    professional: { type: String, required: true }
});

// Criando o modelo para o agendamento
const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
