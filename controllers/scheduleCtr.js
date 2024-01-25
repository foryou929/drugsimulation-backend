const mongoose = require('mongoose')

const ScheduleModel = mongoose.model('Schedule')

exports.create = async (req, res) => {
    try {
        const result = await ScheduleModel.create({ creator: req.user._id, ...req.body })
        res.json({ result, message: 'schedule_created' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

exports.read = async (req, res) => {
    try {
        const result = await ScheduleModel.find({ creator: req.user._id })
        res.json({ result, message: null })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

exports.update = async (req, res) => {
    try {
        const _id = req.params._id
        const result = await ScheduleModel.updateOne({ _id, creator: req.user._id }, req.body)
        if (result.modifiedCount == 1) {
            const result = await ScheduleModel.findOne({ _id })
            res.json({ message: 'schedule_modified', result })
        } else {
            res.status(500).json({ message: 'error_occured' })
        }
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

exports.delete = async (req, res) => {
    try {
        const _id = req.params._id
        const result = await ScheduleModel.deleteOne({ _id, creator: req.user._id })
        if (result.deletedCount == 1) {
            res.json({ message: 'schedule_deleted' })
        } else {
            res.status(500).json({ message: 'error_occured' })
        }
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}