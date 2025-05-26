const mongoose = require('mongoose');

const barangSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // referensi ke koleksi "users"
    required: true
  },
  nama: {
    type: String,
    required: true
  },
  foto: {
    type: String,
    required: true
  },
  harga: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['tersedia', 'tidak tersedia'], // nilai yang diizinkan
    default: 'tersedia'
  }
});

module.exports = mongoose.model('Barang', barangSchema);
