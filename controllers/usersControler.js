const dbConn = require("../config/database")
const { User } = require("../models/associations")

let table = "users";

const getUser = (req, res) => {
    User.findOne({ "id": req.params.id })
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
    dbConn.read(table, {}, (err, user) => {
        if (err) {
            res.status(500).json(err);
        }
        if (user.length == 0) {
            return res.status(404).json({ err: "Not Found" })
        }
        res.status(200).render("users",
            {
                data: user,
                title: req.t("users"),
                logedUser: req.user,
                lang: req.t("lang"),
                students: req.t("students"),
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
        );
    })
}

const createUser = (req, res) => {
    dbConn.create(table, req.body, (err, user) => {
        if (err) {
            console.log(err);
            res.status(500).json({ err })
        }
        res.status(200).json({ message: "User created successfully!" })
    })
}

const updateUser = (req, res) => {
    dbConn.update(table, req.body, { id: req.params.id }, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).json({ err })
        }
        if (result.affectedRows == 0) {
            return res.status(404).json({ err: "Not Found" })
        }
        res.status(200).json({ message: "User updated successfully!" })
    })
}

const deleteUser = (req, res) => {
    dbConn.delete(table, { id: req.params.id }, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).json({ err })
        }
        if (result.affectedRows == 0) {
            return res.status(404).json({ err: "Not Found" })
        }
        res.status(200).json({ message: "User deleted successfully!" })
    })
}

module.exports = { getUser, getAllUers, createUser, deleteUser, updateUser }