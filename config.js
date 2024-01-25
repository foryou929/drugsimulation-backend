const md5 = require('md5')

module.exports = {
    secret: 'super secret key',

    db_url: 'mongodb://127.0.0.1:27017/doctor',
    
    default_admin: {
        email: 'admin@jsonapi.com',
        name: 'Administrator',
        pwd: md5('12345678'),
    },
}