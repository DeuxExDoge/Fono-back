const mongoose = require('mongoose');

const audioSchema = new mongoose.Schema({
  nombre: String,
  datos: Buffer,
  tipo: String,
  fecha: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Audio', audioSchema);
