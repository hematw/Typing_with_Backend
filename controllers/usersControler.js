const { User } = require("../models/associations");
const bcrypt = require("bcrypt");

const getUser = (req, res) => {
  User.findOne({
    where: {
      id: req.params.id,
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ err: "Not Found" });
      }
      res.status(200).render("userEdit", {
        data: user,
        title: req.t("users"),
        logedUser: req.user,
        lang: req.t("lang"),
        users: req.t("users"),
        update: req.t("update"),
        username: req.t("username"),
        email: req.t("email"),
        password: req.t("password"),
        errors: req.flash("err"),
        msgs: req.flash("msg"),
      });
    })
    .catch((err) => res.status(500).json(err));
};

const getAllUers = (req, res) => {
  User.findAll()
    .then((users) => {
      if (!users) {
        return res.status(404).json({ err: "Not Found" });
      }
      res.status(200).render("users", {
        data: users,
        title: req.t("users"),
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
      res.status(500).json(err);
    });
};

const createUser = (req, res) => {
  req.body = {
    ...req.body,
    [req.body.studentId]: parseInt(req.body.studentId),
    password: bcrypt.hashSync(req.body.password, 10),
  };
  User.create(req.body)
    .then((user) => {
      console.log(user);
      req.flash("msg", "User created successfully!");
      return res.status(301).redirect("/users");
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ err });
    });
};

const updateUser = (req, res) => {
  let password = req.body.password;
  if (password) password = bcrypt.hashSync(password);
  User.update(
    {
      ...req.body,
      password,
    },
    {
      where: { id: req.params.id },
    }
  )
    .then((user) => {
      if (!user) {
        req.flash("err", "User Not Found!");
        return res.redirect("/users");
      }
      req.flash("msg", "User updated successfully!");
      return res.redirect("/users");
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ err });
    });
};

const deleteUser = (req, res) => {
  User.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((user) => {
      if (!user) {
        req.flash("err", "User Not Found!");
        return res.redirect("/users");
      }
      req.flash("msg", "User deleted successfully!");
      console.log(score);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ err });
    });
};

module.exports = { getUser, getAllUers, createUser, deleteUser, updateUser };
