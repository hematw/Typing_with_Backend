const express = require("express");
const userRoutes = require("./routes/userRoutes");
const textRoutes = require("./routes/textRoutes");
const scoreRoutes = require("./routes/scoreRoutes");
const session = require("express-session");
const methodOverride = require("./middlewares/methodOverride");
const flash = require("connect-flash");
const isAdmin = require("./middlewares/isAdmin");
const i18next = require("i18next");
const i18nextMiddleware = require("i18next-http-middleware");
const Backend = require("i18next-fs-backend");
const passportConfig = require("./middlewares/passportConfig");
const sequelize = require("./config/database");
const { Score, Text } = require("./models/associations");
const { createUser } = require("./controllers/usersControler");

const app = express();

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/node_modules/bootstrap"));
app.use(methodOverride("_method"));
app.use(flash());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

sequelize.sync().then((r) => console.log("All Models successfully synced. 🙄"));

i18next
  .use(i18nextMiddleware.LanguageDetector)
  .use(Backend)
  .init({
    fallbackLng: "en",
    preload: ["en", "fa"],
    ns: ["common"],
    backend: {
      loadPath: __dirname + `/locales/{{lng}}/{{ns}}.json`,
    },
  });

app.use(i18nextMiddleware.handle(i18next));

app.use(
  session({
    secret: process.env.SESSION_SEC,
    resave: true,
    saveUninitialized: true,
    cookie: {
      maxAge: 30 * 60 * 1000, // Half of a hour
    },
  })
);

app.use(passportConfig.initialize());
app.use(passportConfig.session());

app.get("/setLanguage/:lang", (req, res) => {
  const { lang } = req.params;

  req.i18n.changeLanguage(lang);
  global.lang = lang;

  res.redirect("back");
});

app.use((req, res, next) => {
  let lang = req.session.lang;
  req.i18n.changeLanguage(global.lang || "en");
  next();
});

app.get("/", (req, res) => {
  res.render("home", {
    lang: global.lang,
    user: req.user,
    title: "Atom Typing",
  });
});

app.get("/login", (req, res) => {
  if (req.isAuthenticated()) {
    res.redirect("/");
  } else {
    res.render("login", {
      title: req.t("signin"),
      wellcomeMsg: req.t("wellcome"),
      loginMsg: req.t("loginMsg"),
      newUser: req.t("newUser"),
      email: req.t("email"),
      password: req.t("password"),
      forgot: req.t("forgot"),
      lang: req.t("lang"),
    });
  }
});

app.get("/register", (req, res) => {
  if (req.isAuthenticated()) {
    res.redirect("/");
  } else {
    res.render("register", {
      title: req.t("register"),
      username: req.t("username"),
      haveAccount: req.t("haveAccount"),
      wellcomeMsg: req.t("wellcome"),
      loginMsg: req.t("loginMsg"),
      email: req.t("email"),
      password: req.t("password"),
      forgot: req.t("forgot"),
      lang: req.t("lang"),
    });
  }
});
app.post("/register", createUser);

app.post(
  "/login",
  passportConfig.authenticate("local", { failureRedirect: "/login" }),
  (req, res, next) => {
    req.i18n.changeLanguage(req.session.lang || "en");
    next();
  },
  (req, res) => {
    res.status(302).redirect("back");
  }
);

app.get("/logout", (req, res) => {
  req.logOut(() => res.redirect("/login"));
});

app.use((req, res, next) => {
  req.isAuthenticated() ? next() : res.status(401).redirect("/login");
});

app.get("/typing", (req, res) => {
  const levelQuery = req.query.level;
  Score.findOne({
    where: { userId: req.user.dataValues.id },
    attributes: [[sequelize.fn("MAX", sequelize.col("levelId")), "maxLevel"]],
  })
    .then((result) => {
      const maxLevel =result.dataValues.maxLevel + 1;
      let level=maxLevel;
      if(levelQuery < (maxLevel + 1)){
        level = levelQuery
      }
        

      Text.findOne({
        where: {
          levelId: level,
        },
      }).then((text) => {
        res.render("typing", {
          data: text?.dataValues,
          user: req.user,
          maxLevel,
          title: "ATOM | Typing",
          lang: req.t("lang"),
        });
      });
    })
    .catch((err) => console.log(err));
});

app.use("/records", scoreRoutes);

app.use(isAdmin());
app.use("/users", userRoutes);
app.use("/texts", textRoutes);

app.use((req, res) => {
  res
    .status(404)
    .render("notfound", { title: "Not Found!", lang: global.lang });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is runnig in port ${port}`);
});
