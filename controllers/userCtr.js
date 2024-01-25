const { model } = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken");
const path = require('path')
const config = require(path.resolve('./config.js'))

const User = model('User')

exports.login = async (req, res) => {
    try {
        const { email, pwd } = req.body

        const user = await User.findOne({ email })
        if (!user) {
            res.status(401).json({ message: 'user_not_exist' })
            return
        }

        const isMatch = await bcrypt.compare(pwd, user.pwd);

        if (!isMatch) {
            res.status(401).json({ message: 'user_password_incorrect' })
            return
        }

        const payload = {
            id: user._id,
            userId: user.email,
            avatar: user.avatar,
        };

        jwt.sign(payload, config.secret, {}, (err, token) => {
            if (err)
                throw err
            res.json({ token, user, message: 'user_login_succeeded' })
        });

    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

exports.register = async (req, res) => {
    try {
        const { email, name, pwd } = req.body

        const user = await User.findOne({ email })

        if (user) {
            res.status(402).json({ message: 'user_exist' })
            return
        }

        const salt = await bcrypt.genSalt(10);

        const createdUser = await User.create({ email, name, pwd: await bcrypt.hash(pwd, salt) })
        if (createdUser) {
            res.json({ message: 'user_registration_succeeded' })
        } else {
            res.status(500).json({ message: 'error' })
        }

    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

exports.loginWithToken = async (req, res) => {
    try {
        res.json({ message: null, user: req.user });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

exports.update = async (req, res) => {
    try {
        const userInfo = req.body
        if (userInfo.pwd) {
            const salt = await bcrypt.genSalt(10);
            userInfo.pwd = await bcrypt.hash(userInfo.pwd, salt)
        }
        const result = await User.updateOne({ _id: req.user._id }, req.body)
        if (result.modifiedCount == 1) {
            res.json({ message: 'user_profile_updated' })
        } else {
            res.status(500).json({ message: 'error' })
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}