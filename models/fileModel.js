const { Schema, model } = require('mongoose')

const FileSchema = Schema(
    {
        filename: {
            type: String,
            required: true,
        },
        originalname: {
            type: String,
            required: true,
        },
        minetype: {
            type: String,
            default: '',
        },
        size: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
        collection: process.env.DB_COLLECTION_PREFIX + 'files'
    }
)

model('File', FileSchema)