const passport = require("passport");
const LocalStrategy = require("passport-local");
const dbConn = require("../config/db");

passport.use(new LocalStrategy({
    usernameField: "email"
}, (username, password, done) => {
    dbConn.read("users", { email: username }, (err, user) => {
        if (err) { return done(err) }
        if (user.length == 0) { return done(null, false) }
        if (password !== user[0].password) { return done(null, false) }
        return done(null, user)
    })
}))

passport.serializeUser((user, done) => {
    done(null, user[0].id)
});

passport.deserializeUser((id, done) => {
    dbConn.read("users", { id }, (err, user) => {
        done(err, user[0]);
    })
});

module.exports = passport;