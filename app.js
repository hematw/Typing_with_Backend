const express = require('express');
const studentRoutes = require("./routes/studentRoutes");
const userRoutes = require("./routes/userRoutes");
const textRoutes = require("./routes/textRoutes");
const bcrypt = require("bcrypt");
const dbConn = require('./config/db');
const passport = require("passport");
const LocalStrategy = require("passport-local");
const session = require("express-session");
const methodOverride = require("./middlewares/methodOverride");
const flash = require("connect-flash");
const isAdmin = require("./middlewares/isAdmin")
const i18next = require("i18next");
const i18nextMiddleware = require("i18next-http-middleware");
const Backend = require("i18next-fs-backend");

const app = express();


app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/node_modules/bootstrap"));
app.use(methodOverride('_method'));
app.use(flash())
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

i18next
    .use(i18nextMiddleware.LanguageDetector)
    .use(Backend)
    .init({
        fallbackLng: 'en',
        preload: ['en', 'fa'],
        ns: ['common'], 
        backend: {
            loadPath: __dirname + `/locales/{{lng}}/{{ns}}.json`,
        },
    });

app.use(i18nextMiddleware.handle(i18next));


app.use(session({
    secret: process.env.SESSION_SEC,
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 30 * 60 * 1000, // Half of a hour
    },
}))

app.use(passport.initialize());
app.use(passport.session());


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

app.get('/setLanguage/:lang', (req, res) => {
    const { lang } = req.params;

    req.i18n.changeLanguage(lang);
    global.lang = lang

    res.redirect('back');
});

app.use((req, res, next) => {
    let lang = req.session.lang;
    req.i18n.changeLanguage(global.lang || "en");
    next();
});

app.get("/login", (req, res) => {
    if (req.isAuthenticated()) {
        res.redirect("/");
    } else {
        res.render("login", { 
            title: req.t(("signin")),
            wellcomeMsg: req.t("wellcome"),
            loginMsg: req.t("loginMsg"),
            email: req.t("email"),
            password: req.t("password"),
            forgot: req.t("forgot"),
            lang: req.t("lang")
        })
    }
});

app.post("/login",
    passport.authenticate("local", { failureRedirect: "/login" })
    ,
    (req, res, next) => {
        req.i18n.changeLanguage(req.session.lang || "en");
        next();
    },
    (req, res) => {
        res.status(302).redirect("/students");
    }
)

app.get("/logout", (req, res) => {
    req.logOut(() => {
        res.redirect("/login")
    });
});

app.get("/", (req, res) => {
    if (req.isAuthenticated()) {
        res.render("home", { title: "Home", logedUser: req.user })
    }
    else {
        res.status(401).redirect("/login")
    }
})

app.use((req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(401).redirect("/login")
    }
})


app.use("/students", studentRoutes);
app.use("/users", userRoutes);
app.use("/texts", textRoutes);

app.use((req, res) => {
    res.status(404).render("notfound", { title: "Not Found!" });
})

const port = 3000 || process.env.PORT;
app.listen(port, () => {
    console.log(`Server is runnig in port ${port}`);
});