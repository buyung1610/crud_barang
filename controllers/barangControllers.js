const Barang = require('../models/barangModel');

const barangControllers = {
    createBarang: async (req, res) => {
        try {
            const user_id = req.user.id;
            const foto = req.file.filename;
            const { nama, harga, status } = req.body;
            const barang = new Barang({ user_id, nama, foto, harga, status });
            await barang.save();
            res.status(201).json({ 
                message: 'Barang berhasil ditambahkan', 
                data: barang
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Terjadi kesalahan server' });
        }
    },

    getAllBarang: async (req, res) => {
        try {
            const user_id = req.user.id;
            const barang = await Barang.find({ user_id });
            if (!barang) {
                return res.status(404).json({ message: 'Barang tidak ditemukan' });
            }
            res.json(barang);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Terjadi kesalahan server' });
        }
    },

    getBarangById: async (req, res) => {
        try {
            const barang = await Barang.findById(req.params.id);
            if (!barang) {
                return res.status(404).json({ message: 'Barang tidak ditemukan' });
            }
            res.json(barang);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Terjadi kesalahan server' });
        }
    },

    editBarang: async (req, res) => {
        try {
            const user_id = req.user.id;
            const { nama, foto, harga, stok } = req.body;
            const barang = await Barang.findById(req.params.id);
            if (!barang) {
                return res.status(404).json({ message: 'Barang tidak ditemukan' });
            }
            barang.user_id = user_id;
            barang.nama = nama;
            barang.foto = foto;
            barang.harga = harga;
            barang.stok = stok;
            await barang.save();
            res.json({ message: 'Barang berhasil diubah' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Terjadi kesalahan server' });
        }
    },

    editStatusBarang: async (req, res) => {
        try {
            const user_id = req.user.id;
            const status = req.body.status;
            if (status !== 'tersedia' && status !== 'tidak tersedia') {
                return res.status(400).json({ message: 'Status barang harus "tersedia" atau "tidak tersedia"' });
            }
            const barang = await Barang.findById(req.params.id);
            if (!barang) {
                return res.status(404).json({ message: 'Barang tidak ditemukan' });
            }
            barang.user_id = user_id;
            barang.status = status;
            await barang.save();
            res.json({ 
                message: 'Status barang berhasil diubah',
                data: barang
             });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Terjadi kesalahan server' });
        }  
    },

    deleteBarang: async (req, res) => {
        try {
            const user_id = req.user.id;
            const barang = await Barang.findById(req.params.id);
            if (!barang) {
                return res.status(404).json({ message: 'Barang tidak ditemukan' });
            }
            await Barang.deleteOne({ _id: req.params.id });
            res.json({ message: 'Barang berhasil dihapus' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Terjadi kesalahan server' });
        }
    }
}

module.exports = barangControllers;