const passport = require("passport");
const LocalStrategy = require("passport-local");
const { User } = require("../models/associations");

passport.use(new LocalStrategy({
    usernameField: "email"
}, (username, password, done) => {
    User.findOne({ email: username })
        .then(user => {
            if (!user) return done(null, false);
            if (password !== user[0].password) return done(null, false);
            return done(null, user)
        })
        .catch(err => done(err))
}))

passport.serializeUser((user, done) => {
    done(null, user[0].id)
});

passport.deserializeUser((id, done) => {
    User.findOne({ id })
        .then(user => done(null, user))
        .catch(err => done(err, null))
});

module.exports = passport;