require('dotenv').config();
const connectDB = require('./config/db');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const path = require('path');
// Conexión a mongo letsgoo
connectDB();


// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Rutas
const rutaDiscriminacion = require('../src/routers/discriminacion');
app.use('/discriminacion', rutaDiscriminacion);

// Iniciar servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
