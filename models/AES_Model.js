const { Schema, model } = require('mongoose')

const AES_Schema = Schema(
    {
        name: {
            type: String,
            required: true,
        },
        user : {
            type: Schema.Types.ObjectId,
            required: true,
        },
        height: {
            type: Number,
            required: true,
        },
        weight: {
            type: Number,
            required: true,
        },
        age: {
            type: Number,
            required: true,
        },
        gendor: {
            type: Number,
            required: true,
        },
        ASA_PS: {
            type: Number,
            required: true,
        },
        amount: Number,
        hypnotics: Number,
        percent: Number
    },
    {
        timestamps: true,
        collection: process.env.DB_COLLECTION_PREFIX + 'AES'
    }
)

model('AES', AES_Schema)