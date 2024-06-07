const md5 = require('md5')

module.exports = {
    secret: 'super secret key',

    db_url: 'mongodb://127.0.0.1:27017/doctor',

    default_admin: {
        email: 'Eternel.kk@gmail.com',
        name: 'Administrator',
        pwd: md5('12345678'),
        isAdmin: true,
    },

    pricing_plans: [
        {
            id: 1, price: 1500, description: [
                "pricing_plan_simulate",
            ]
        },
        {
            id: 2, price: 2500, description: [
                "pricing_plan_simulate",
                "pricing_plan_save"
            ]
        },
    ]
}