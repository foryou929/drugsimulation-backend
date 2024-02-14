const path = require('path');
const simulationCtr = require(path.resolve('./controllers/simulationCtr'));

const passport = require('passport')

const requireAuth = passport.authenticate('jwt', { session: false });
const requireLogin = passport.authenticate('local', { session: false });

module.exports = (app) => {
    app.post('/api/PKS/:_id', requireAuth, simulationCtr.PKS.create)
    app.get('/api/PKS', requireAuth, simulationCtr.PKS.read)
    app.put('/api/PKS', requireAuth, simulationCtr.PKS.update)
    app.delete('/api/PKS/:_id', requireAuth, simulationCtr.PKS.delete)

    app.post('/api/AES/:_id', requireAuth, simulationCtr.AES.create)
    app.get('/api/AES', requireAuth, simulationCtr.AES.read)
    app.put('/api/AES', requireAuth, simulationCtr.AES.update)
    app.delete('/api/AES/:_id', requireAuth, simulationCtr.AES.delete)
}