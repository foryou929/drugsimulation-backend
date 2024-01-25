const path = require('path')
const userCtr = require(path.resolve('./controllers/userCtr'))

const passport = require('passport')

const requireAuth = passport.authenticate('jwt', { session: false });
const requireLogin = passport.authenticate('local', { session: false });

module.exports = (app) => {
    app.post('/api/login', userCtr.login)
    app.post('/api/register', userCtr.register)
    app.get('/api/login', requireAuth, userCtr.loginWithToken)
    app.put('/api/profile', requireAuth, userCtr.update)
}