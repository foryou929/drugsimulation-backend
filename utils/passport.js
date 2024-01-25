const path = require('path')
const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const LocalStrategy = require('passport-local');

const config = require(path.resolve('./config'))

const { model } = require('mongoose')
const User = model('User')

// Setting up local login strategy
passport.use(new LocalStrategy((email, pwd, done) => {
    User.findOne({ email }, (err, user) => {
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        if (!user.verifyPassword(pwd)) { return done(null, false); }
        return done(null, user);
    });
}
));

// Setting JWT strategy options
const jwtOptions = {
    // Telling Passport to check authorization headers for JWT
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    // Telling Passport where to find the secret
    secretOrKey: config.secret
};

// Setting up JWT login strategy
passport.use(new JwtStrategy(jwtOptions, async (payload, done) => {
    const user = await User.findById(payload.id)
    if (!user) { return done(null, false); }
    return done(null, user);
}));