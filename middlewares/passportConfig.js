const passport = require("passport");
const LocalStrategy = require("passport-local");
const { User } = require("../models/associations");

passport.use(new LocalStrategy({
    usernameField: "email"
}, (username, password, done) => {
    User.findOne({ where: { email: username } })
        .then(user => {
            if (!user) return done(null, false);
            if (password !== user.password) return done(null, false);
            return done(null, user)
        })
        .catch(err => done(err))
}))

passport.serializeUser((user, done) => {
    done(null, user.id)
});

passport.deserializeUser((id, done) => {
    User.findOne({ where: { id } })
        .then(user => done(null, user))
        .catch(err => done(err, null))
});

module.exports = passport;