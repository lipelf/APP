const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

/**
 * Define o esquema e o modelo do evento
 */
const eventsSchema = new mongoose.Schema({
    id: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    location: { type: String, required: true },
    status: { type: String, required: true }
});

const Event = mongoose.model('Event', eventsSchema);

/**
 * @swagger
 * tags:
 *   name: Events
 *   description: Endpoints relacionados aos eventos.
 */

/**
 * @swagger
 * /events:
 *   get:
 *     tags: [Events]
 *     summary: Retorna todos os eventos
 *     responses:
 *       200:
 *         description: Uma lista de eventos
 */
router.get('/', async (req, res) => {
    try {
        const events = await Event.find().sort({ title: 1 });
        res.json(events);
    } catch (err) {
        res.status(500).json({ erro: 'Erro ao buscar eventos' });
    }
});

/**
 * @swagger
 * /events/{id}:
 *   get:
 *     tags: [Events]
 *     summary: Retorna um evento específico
 */
router.get('/:id', async (req, res) => {
    try {
        const event = await Event.findOne({ id: req.params.id });
        if (!event) {
            return res.status(404).json({ erro: 'Evento não encontrado' });
        }
        res.json(event);
    } catch (err) {
        res.status(500).json({ erro: 'Erro ao buscar o evento' });
    }
});

/**
 * @swagger
 * /events:
 *   post:
 *     tags: [Events]
 *     summary: Insere um novo evento
 */
router.post('/', async (req, res) => {
    const { title, description, date, location, status } = req.body;

    if (!title || !description || !date || !location || !status) {
        return res.status(400).json({ erro: 'Todos os campos são obrigatórios' });
    }

    const newEvent = new Event({
        id: uuidv4(),
        title,
        description,
        date,
        location,
        status
    });

    try {
        await newEvent.save();
        res.status(200).json({ sucesso: 'Evento cadastrado com sucesso', id: newEvent.id });
    } catch (err) {
        res.status(500).json({ erro: 'Erro ao salvar o evento' });
    }
});

/**
 * @swagger
 * /events/{id}:
 *   put:
 *     tags: [Events]
 *     summary: Atualiza um evento existente
 */
router.put('/:id', async (req, res) => {
    const { title, description, date, location, status } = req.body;

    try {
        const updatedEvent = await Event.findOneAndUpdate(
            { id: req.params.id },
            { title, description, date, location, status },
            { new: true, runValidators: true }
        );

        if (!updatedEvent) {
            return res.status(404).json({ erro: 'Evento não encontrado' });
        }

        res.json(updatedEvent);
    } catch (err) {
        res.status(400).json({ erro: 'Erro ao atualizar o evento' });
    }
});

/**
 * @swagger
 * /events/{id}:
 *   delete:
 *     tags: [Events]
 *     summary: Deleta um evento existente
 */
router.delete('/:id', async (req, res) => {
    try {
        const deletedEvent = await Event.findOneAndDelete({ id: req.params.id });

        if (!deletedEvent) {
            return res.status(404).json({ erro: 'Evento não encontrado' });
        }

        res.json({ mensagem: 'Evento deletado com sucesso.' });
    } catch (err) {
        res.status(500).json({ erro: 'Erro ao deletar o evento' });
    }
});

module.exports = router;
