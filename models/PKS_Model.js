const { Schema, model } = require('mongoose')

const PKS_Schema = Schema(
    {
        name: {
            type: String,
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
            type: Boolean,
            required: true,
        },
        ASA_PS: {
            type: Number,
            required: true,
        },
        remimazolam: [{
            mode: Number,
            time: Number,
            amount: Number
        }],
        dexmedetomidine: [{
            mode: Number,
            time: Number,
            amount: Number
        }],
        remifentanil: [{
            mode: Number,
            time: Number,
            amount: Number
        }],
        fentanyl: [{
            mode: Number,
            time: Number,
            amount: Number
        }],
    },
    {
        timestamps: true,
        collection: process.env.DB_COLLECTION_PREFIX + 'PKS'
    }
)

model('PKS', PKS_Schema)