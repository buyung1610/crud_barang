// routes/barangRoutes.js
const express = require('express');
const router = express.Router();
const barangControllers = require('../controllers/barangControllers');
const verifyToken = require('../middleware/verifyToken');
const upload = require('../middleware/upload');

// Semua route memakai middleware verifyToken
router.use(verifyToken);

router.get('/', barangControllers.getAllBarang);          // GET semua barang
router.get('/:id', barangControllers.getBarangById);      // GET satu barang
router.post('/', upload.single('foto'), barangControllers.createBarang);         // POST tambah
router.put('/:id', barangControllers.editBarang);         // PUT edit
router.delete('/:id', barangControllers.deleteBarang);    // DELETE

module.exports = router;
