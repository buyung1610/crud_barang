const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require("dotenv").config(); 
const connectDB = require('./config/connectDb');

connectDB();

const authRoutes = require('./routes/authRoutes');
const barangRoutes = require('./routes/barangRoutes');

const app = express();
const port = process.env.PORT;

app.use(express.json()); // untuk application/json
app.use(express.urlencoded({ extended: true })); 

// Folder statis untuk melihat gambar
app.use('/uploads', express.static('uploads'));

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/auth', authRoutes);
app.use('/barang', barangRoutes);

// Server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
