const { Score } = require("../models/associations");

function saveScore(req, res) {
  Score.create({
    userId: req.body.userId,
    levelId: req.body.levelId,
    point: req.body.score,
  })
    .then((score) => {
      req.flash("msg", score);
      res.redirect("back");
      console.log(score);
    })
    .catch((err) => {
      console.log(err);
      req.flash("err", err);
    });
}

function getAllScores(req, res) {
  Score.findAll()
    .then((scores) => {
      console.log(scores);
      if (!scores) {
        req.flash("msg", "No records found!");
      }
      res.status(200).render("records", {
        data: scores,
        title: req.t("records"),
        logedUser: req.user,
        lang: req.t("lang"),
        typing: req.t("typing"),
        users: req.t("users"),
        texts: req.t("texts"),
        records: req.t("records"),
        settings: req.t("settings"),
        classes: req.t("classes"),
        logout: req.t("logout"),
        add: req.t("add"),
        username: req.t("username"),
        email: req.t("email"),
        password: req.t("password"),
        errors: req.flash("err"),
        msgs: req.flash("msg"),
      });
    })
    .catch((err) => {
      console.log(err);
      req.flash("err", err);
    });
}

function deleteScore(req, res) {
  const { id } = req.params;
  Score.destroy({
    where: { id: id },
  })
    .then((score) => {
      req.flash("msg", "Record deleted successfully!");
      res.redirect("/records");
      console.log(score);
    })
    .catch((err) => {
      console.log(err);
      req.flash("msg", "Couldn't delete Record!");
      req.flash("err", err);
    });
}

module.exports = { saveScore, getAllScores, deleteScore };
