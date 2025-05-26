const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'rahasia_kamu';

const authControllers = {
    login: async (req, res) => {
        try {
            const { username, password } = req.body;

            const user = await User.findOne({ username });
            if (!user) {
                return res.status(401).json({ message: "Username atau password salah" });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({ message: "Username atau password salah" });
            }

            // Membuat payload token
            const payload = {
                id: user._id,
                username: user.username,
                nama: user.nama_user,
                role: user.role
            };

            // Membuat token JWT
            const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1d' });

            res.json({
                message: "Login berhasil",
                token, // kirim token ke frontend
                user: payload
            });

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Terjadi kesalahan server" });
        }
    },

    register: async (req, res) => {
        try {
            const { username, password } = req.body;

            const existingUser = await User.findOne({ username });
            if (existingUser) {
                return res.status(400).json({ message: "Username sudah digunakan" });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const user = new User({ username, password: hashedPassword });
            await user.save();

            res.json({ message: "Registrasi berhasil" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Terjadi kesalahan server" });
        }
    }
};

module.exports = authControllers;
