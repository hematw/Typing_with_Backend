const { User } = require("../models/associations")

let table = "users";

const getUser = (req, res) => {
    User.findOne({
        where: {
            id: req.params.id
        }
    })
        .then(user => {
            if (!user) {
                return res.status(404).json({ err: "Not Found" })
            }
            res.status(200).json(user)
        }
        )
        .catch(err => res.status(500).json(err))
}

const getAllUers = (req, res) => {
    User.findAll()
        .then(users => {
            if (!users) {
                return res.status(404).json({ err: "Not Found" })
            }
            res.status(200).render("users",
                {
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
                    msgs: req.flash("msg")
                }
            )
        })
        .catch(err => {
            res.status(500).json(err);
        })
}

const createUser = (req, res) => {
    req.body= {...req.body, [req.body.studentId]: parseInt(req.body.studentId)}
    User.create(req.body)
        .then(user => {
            res.status(200).json({ message: "User created successfully!", user })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ err })
        })
}

const updateUser = (req, res) => {

    User.update(req.body, {
        where: { id: req.params.id }
    })
        .then(user => {
            if (!user) {
                return res.status(404).json({ err: "Not Found" })
            }
            res.status(200).json({ message: "User updated successfully!" })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ err })
        })
}

const deleteUser = (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    }).then(user => {
        if (!user) {
            return res.status(404).json({ err: "Not Found" })
        }
        res.status(200).json({ message: "User deleted successfully!" })
    }).catch(err => {
        console.log(err);
        res.status(500).json({ err })
    })
}

module.exports = { getUser, getAllUers, createUser, deleteUser, updateUser }