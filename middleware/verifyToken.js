const jwt = require('jsonwebtoken');
const SECRET_KEY = 'rahasia_kamu';

function verifyToken(req, res, next) {
    const token = req.headers.authorization?.split(" ")[1]; // Bearer <token>

    if (!token) return res.status(401).json({ message: 'Token tidak ditemukan' });

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded; // menyimpan user ke request
        next();
    } catch (err) {
        return res.status(403).json({ message: 'Token tidak valid' });
    }
}

module.exports = verifyToken;
