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

const { google } = require('googleapis');

// Configure OAuth credentials
const clientId = process.env.GOOGLE_OAUTH_CLIENT_ID;
const clientSecret = process.env.GOOGLE_OAUTH_CLIENT_SECRET;
const redirectUri = process.env.GOOGLE_OAUTH_REDIRECT_URI;
const scopes = ['profile', 'email']; // Specify the required scopes

// Create an OAuth2 client
const oauth2Client = new google.auth.OAuth2(
    clientId,
    clientSecret,
    redirectUri
);

exports.loginWithGoogle = (req, res) => {
    const authUrl = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: scopes,
    });
    res.redirect(authUrl);
};

exports.authGoogle = async (req, res) => {
    const code = req.query.code;

    try {
        // Exchange authorization code for tokens
        const { tokens } = await oauth2Client.getToken(code);
        const accessToken = tokens.access_token;
        const refreshToken = tokens.refresh_token;

        // Set the access token and refresh token on the OAuth2 client
        oauth2Client.setCredentials({
            access_token: accessToken,
            refresh_token: refreshToken,
        });

        // Use the access token to make API requests
        const oauth2 = google.oauth2({
            auth: oauth2Client,
            version: 'v2',
        });
        const { data } = await oauth2.userinfo.get();

        // Perform any necessary actions with the user data
        const user = await User.findOne({ email: data.email });

        if (!user) {
            res.redirect(process.env.REACT_APP_URL + '/login?status=user_not_exist');
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
            res.redirect(process.env.REACT_APP_URL + '/login?status=success&token=' + token);
        });
    } catch (error) {
        console.error('Error retrieving access token:', error);
        res.status(500).send('Error retrieving access token');
    }
}