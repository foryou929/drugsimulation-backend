const { Schema, model } = require('mongoose')

const ScheduleModel = Schema({
    creator: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    title: {
        type: String,
        required: true,
    },
    note: {
        type: String,
        required: true,
    },
    type: {
        type: Number,
        required: true,
    },
    notifyBefore: {
        type: Number,
        required: true,
    },
    startTime: {
        type: Date,
        required: true,
    },
    checkFlag: {
        type: Boolean,
        default: false,
    }
},{
    timestamps: true,
    collection: process.env.DB_COLLECTION_PREFIX + 'schedules',
})

model('Schedule', ScheduleModel)