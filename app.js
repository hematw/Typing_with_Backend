const express = require('express');
const studentRoutes = require("./routes/studentRoutes");
const userRoutes = require("./routes/userRoutes");
const textRoutes = require("./routes/textRoutes");
const scoreRoutes = require("./routes/scoreRoutes")
const bcrypt = require("bcrypt");
const dbConn = require('./config/db');
const session = require("express-session");
const methodOverride = require("./middlewares/methodOverride");
const flash = require("connect-flash");
const isAdmin = require("./middlewares/isAdmin")
const i18next = require("i18next");
const i18nextMiddleware = require("i18next-http-middleware");
const Backend = require("i18next-fs-backend");
const passportConfig = require('./middlewares/passportConfig');
const sequelize = require('./config/db');

const app = express();


app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/node_modules/bootstrap"));
app.use(methodOverride('_method'));
app.use(flash())
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

sequelize.sync().then(r => console.log("All Models successfully synced. 🙄"))

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

app.use(passportConfig.initialize());
app.use(passportConfig.session());

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
    passportConfig.authenticate("local", { failureRedirect: "/login" })
    ,
    (req, res, next) => {
        req.i18n.changeLanguage(req.session.lang || "en");
        next();
    },
    (req, res) => {
        res.status(302).redirect("/");
    }
)



app.get("/logout", (req, res) => {
    req.logOut(() => {
        res.redirect("/login")
    });
});


app.use((req, res, next) => {
    req.isAuthenticated() ? next() : res.status(401).redirect("/login")
})



app.get("/typing", (req, res) => {
    let subQuery = `SELECT MAX(level_id) AS maxLevel 
    FROM scores 
    WHERE user_id = ${req.user.id}`

    let sql = `
    SELECT texts.*, maxLevel
    FROM texts
    CROSS JOIN (${subQuery}) AS subquery
    WHERE level_id = subquery.maxLevel
    ORDER BY RAND()
    LIMIT 1
    `;

    dbConn.query(sql, (err, result) => {
        if (err) {
            console.log(err);
        }

        res.render("typing", {
            data: result[0],
            user: req.user
        })
    })

})

app.use("/scores", scoreRoutes);

app.use(isAdmin())

app.get("/", (req, res) => {
    if (req.isAuthenticated()) {
        res.render("home",
            {
                title: "Home",
                logedUser: req.user,
                students: req.t("students"),
                users: req.t("users"),
                texts: req.t("texts"),
                records: req.t("records"),
                settings: req.t("settings"),
                classes: req.t("classes"),
                sclass: req.t("class"),
                logout: req.t("logout"),
                lang: req.t("lang"),
                wellcomeMsg: req.t("wellcome")
            }
        )
    }
    else {
        res.status(401).redirect("/login")
    }
})


app.use("/students", studentRoutes);
app.use("/users", userRoutes);
app.use("/texts", textRoutes);

app.use((req, res) => {
    res.status(404).render("notfound", { title: "Not Found!" });
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is runnig in port ${port}`);
});