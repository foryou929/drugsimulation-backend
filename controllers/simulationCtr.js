const { model } = require('mongoose')

const PKS = model('PKS'), AES = model('AES');

exports.PKS = {
    create: async (req, res) => {
        try {
            await PKS.create(req.body);
            res.json({ message: 'success' });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
    read: async (req, res) => {
        try {
            const _id = req.params;
            const result = await PKS.findOne({ _id });
            res.json({ message: 'success', result });
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
            await PKS.deleteOne({ _id });
            res.json({ message: 'success' });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
}

exports.AES = {
    create: async (req, res) => {
        try {
            await AES.create(req.body);
            res.json({ message: 'success' });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
    read: async (req, res) => {
        try {
            const _id = req.params;
            const result = await AES.findOne({ _id });
            res.json({ message: 'success', result });
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
            await AES.deleteOne({ _id });
            res.json({ message: 'success' });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
}