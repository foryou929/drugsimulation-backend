const path = require('path')
const scheduleCtr = require(path.resolve('./controllers/scheduleCtr'))

const passport = require('passport')

const requireAuth = passport.authenticate('jwt', { session: false });
const requireLogin = passport.authenticate('local', { session: false });

module.exports = (app) => {
    app.post('/api/schedule', requireAuth, scheduleCtr.create)
    app.get('/api/schedule', requireAuth, scheduleCtr.read)
    app.put('/api/schedule/:_id', requireAuth, scheduleCtr.update)
    app.delete('/api/schedule/:_id', requireAuth, scheduleCtr.delete)
}