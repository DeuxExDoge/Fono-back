const express = require('express');
const router = express.Router();
const upload = require('../midelware/multer');
const Audio = require('../models/audio');

// Ruta: subir audio
router.post('/subir', upload.single('audio'), async (req, res) => {
  if (!req.file) return res.status(400).send('No se subió ningún archivo');

  try {
    const nuevoAudio = new Audio({
      nombre: req.file.originalname,
      datos: req.file.buffer,
      tipo: req.file.mimetype,
    });

    const guardado = await nuevoAudio.save();
    res.status(201).json({ id: guardado._id, mensaje: 'Audio guardado exitosamente' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al guardar el audio');
  }
});

// Ruta: obtener audio por ID
router.get('/:id', async (req, res) => {
  try {
    const audio = await Audio.findById(req.params.id);
    if (!audio) return res.status(404).send('Audio no encontrado');

    res.set('Content-Type', audio.tipo);
    res.send(audio.datos);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al obtener el audio');
  }
});

module.exports = router;
