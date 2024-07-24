const { Text } = require("../models/associations");

const getText = (req, res) => {
  Text.findOne({ where: { id: req.params.id } })
    .then((text) => {
      res.status(200).render("textEdit", {
        data: text,
        title: req.t("users"),
        logedUser: req.user,
        lang: req.t("lang"),
        texts: req.t("texts"),
        update: req.t("update"),
        username: req.t("username"),
        email: req.t("email"),
        password: req.t("password"),
        errors: req.flash("err"),
        msgs: req.flash("msg"),
      });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};
const getAllText = (req, res) => {
  Text.findAll()
    .then((texts) => {
      res.status(200).render("texts", {
        data: texts,
        title: req.t("texts"),
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
        levelId: req.t("levelId"),
        content: req.t("content"),
        email: req.t("email"),
        password: req.t("password"),
        errors: req.flash("err"),
        msgs: req.flash("msg"),
      });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

const createText = (req, res) => {
  Text.create(req.body)
    .then((text) => {
      req.flash("msg", "Text created successfully!");
      res.status(200).redirect("/texts");
    })
    .catch((err) => {
      console.log(err);
      req.flash("err", "Couldn't create Text!");
      res.status(200).redirect("/texts");
    });
};

const updateText = (req, res) => {
  Text.update(req.body, { where: { id: req.params.id } })
    .then((result) => {
      req.flash("msg", "Text updated successfully!");
      res.status(200).redirect("/texts");
    })
    .catch((err) => {
      console.log(err);
      req.flash("err", "Couldn't update the text");
      res.status(500).redirect("/texts");
    });
};

const deleteText = (req, res) => {
  Text.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((result) => {
      console.log(result);
      req.flash("msg", "Text deleted successfully!");
      res.redirect("/texts");
    })
    .catch((err) => {
      res.status(200).json({ message: "Text deleted successfully!" });
    });
};

module.exports = { getText, createText, updateText, deleteText, getAllText };
