const { Schema, model } = require('mongoose')

const UserSchema = Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        name: {
            type: String,
            required: true,
        },
        pwd: {
            type: String,
            required: true,
        },
        paid: {
            type: Boolean,
            default: false,
        },
        avatar: {
            type: String,
            default: '',
        },
        isAdmin: {
            type: Boolean,
            default: false,
        }
    },
    {
        collection: process.env.DB_COLLECTION_PREFIX + 'users',
        timestamps: true,
    }
)

model('User', UserSchema)

const path = require('path')
const bcrypt = require('bcrypt')
const config = require(path.resolve('./config'))

const User = model("User");

const init = async () => {
    try {
        var admin = await User.findOne({ email: config.default_admin.email });

        if (admin) {

        } else {
            const salt = await bcrypt.genSalt(10);

            await User.create({
                email: config.default_admin.email,
                name: config.default_admin.name,
                pwd: await bcrypt.hash(config.default_admin.pwd, salt)
            })
        }
    } catch (err) {
        console.log(err.message)
    }
}

init();