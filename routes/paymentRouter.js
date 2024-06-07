const path = require('path')
const paymentCtr = require(path.resolve('./controllers/paymentCtr'))

module.exports = (app) => {
    app.post('/api/payment/:gateway', paymentCtr.pay)
    app.get('/api/pricing_plan', paymentCtr.pricingPlan)
}