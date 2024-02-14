const { model } = require('mongoose')

const PKS = model('PKS'), AES = model('AES');

exports.PKS = {
    create: async (req, res) => {
        try {
            await PKS.create({ ...req.body, user: req.user._id });
            res.json({ message: 'simulation_save_success' });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
    readAll: async (req, res) => {
        try {
            const result = await PKS.find({ user: req.user._id });
            res.json({ result });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
    read: async (req, res) => {
        try {
            const _id = req.params;
            const result = await PKS.findOne({ _id, user: req.user._id });
            res.json({ result });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
    update: async (req, res) => {
        try {
            res.json({ message: 'success' });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
    delete: async (req, res) => {
        try {
            const _id = req.params;
            await PKS.deleteOne({ _id, user: req.user._id });
            res.json({ message: 'simulation_delete_success' });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
}

exports.AES = {
    create: async (req, res) => {
        try {
            await AES.create({ ...req.body, user: req.user._id });
            res.json({ message: 'simulation_save_success' });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
    readAll: async (req, res) => {
        try {
            const result = await AES.find({ user: req.user._id });
            res.json({ result });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
    read: async (req, res) => {
        try {
            const _id = req.params;
            const result = await AES.findOne({ _id, user: req.user._id });
            res.json({ result });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
    update: async (req, res) => {
        try {
            res.json({ message: 'success' });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
    delete: async (req, res) => {
        try {
            const _id = req.params;
            await AES.deleteOne({ _id, user: req.user._id });
            res.json({ message: 'simulation_delete_success' });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
}