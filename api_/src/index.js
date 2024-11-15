// src/index.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const appointmentRoutes = require('./routes/appointmentRoutes');
const eventsRoutes = require('./routes/eventsRoutes');
const professionalsRoutes = require('./routes/professionalsRoutes');
const studentsRoutes = require('./routes/studentsRoutes');
const teachersRoutes = require('./routes/teachersRoutes');
const usersRoutes = require('./routes/usersRoutes');

const app = express();
app.use(bodyParser.json());

const cors = require('cors');
app.use(cors());

// Conecte-se ao MongoDB
const mongoURI = 'mongodb://localhost:27017/mydb'; // Altere para o URI do seu MongoDB
mongoose.connect(mongoURI)
  .then(() => {
    console.log('Conectado ao MongoDB');
  })
  .catch((err) => {
    console.error('Erro ao conectar ao MongoDB:', err);
  });

// Use as rotas
app.use('/api/appointments', appointmentRoutes);
app.use('/api/events', eventsRoutes);
app.use('/api/professionals', professionalsRoutes);
app.use('/api/students', studentsRoutes);
app.use('/api/teachers', teachersRoutes);
app.use('/api/users', usersRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
