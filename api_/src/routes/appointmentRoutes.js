const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

/**
 * Define o esquema e o modelo do agendamento
 */
const appointmentSchema = new mongoose.Schema({
    id: { type: String, required: true },
    specialty: { type: String, required: true },
    comments: { type: String, required: true },
    date: { type: Date, required: true },
    student: { type: String, required: true },
    professional: { type: String, required: true }
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

/**
 * @swagger
 * tags:
 *   name: Appointment
 *   description: Endpoints relacionados aos agendamentos. 
 */
/**
 * @swagger
 * /appointment:
 *   get:
 *     tags: [Appointment]
 *     summary: Retorna todos os agendamentos
 *     responses:
 *       200:
 *         description: Uma lista de agendamentos
 */
router.get('/', async (req, res) => {
    try {
        const appointments = await Appointment.find().sort({ professional: 1 });
        res.json(appointments);
    } catch (err) {
        res.status(500).json({ erro: 'Erro ao buscar agendamentos' });
    }
});

/**
 * @swagger
 * /appointment/{id}:
 *   get:
 *     tags: [Appointment]
 *     summary: Retorna um agendamento específico
 */
router.get('/:id', async (req, res) => {
    try {
        const appointment = await Appointment.findOne({ id: req.params.id });
        if (!appointment) {
            return res.status(404).json({ erro: 'Agendamento não encontrado' });
        }
        res.json(appointment);
    } catch (err) {
        res.status(500).json({ erro: 'Erro ao buscar o agendamento' });
    }
});

/**
 * @swagger
 * /appointment:
 *   post:
 *     tags: [Appointment]
 *     summary: Insere um novo agendamento
 */
router.post('/', async (req, res) => {
    const { specialty, comments, date, student, professional } = req.body;

    if (!specialty || !comments || !date || !student || !professional) {
        return res.status(400).json({ erro: 'Todos os campos são obrigatórios' });
    }

    const newAppointment = new Appointment({
        id: uuidv4(),
        specialty,
        comments,
        date,
        student,
        professional
    });

    try {
        await newAppointment.save();
        res.status(200).json({ sucesso: 'Agendamento cadastrado com sucesso', id: newAppointment.id });
    } catch (err) {
        res.status(500).json({ erro: 'Erro ao salvar o agendamento' });
    }
});

/**
 * @swagger
 * /appointment/{id}:
 *   put:
 *     tags: [Appointment]
 *     summary: Substitui um agendamento existente
 */
router.put('/:id', async (req, res) => {
    const { specialty, comments, date, student, professional } = req.body;

    try {
        const updatedAppointment = await Appointment.findOneAndUpdate(
            { id: req.params.id },
            { specialty, comments, date, student, professional },
            { new: true, runValidators: true }
        );

        if (!updatedAppointment) {
            return res.status(404).json({ erro: 'Agendamento não encontrado' });
        }

        res.json(updatedAppointment);
    } catch (err) {
        res.status(400).json({ erro: 'Erro ao atualizar o agendamento' });
    }
});

/**
 * @swagger
 * /appointment/{id}:
 *   delete:
 *     tags: [Appointment]
 *     summary: Deleta um agendamento existente
 */
router.delete('/:id', async (req, res) => {
    try {
        const deletedAppointment = await Appointment.findOneAndDelete({ id: req.params.id });

        if (!deletedAppointment) {
            return res.status(404).json({ erro: 'Agendamento não encontrado' });
        }

        res.json({ mensagem: 'Agendamento deletado com sucesso.' });
    } catch (err) {
        res.status(500).json({ erro: 'Erro ao deletar o agendamento' });
    }
});

module.exports = router;
