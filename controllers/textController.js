const { Text } = require("../models/associations")

const getText = (req, res) => {
    Text.findOne({ id: req.params.id })
        .then(text => {
            res.status(200).json(text);
        })
        .catch(err => {
            res.status(500).json(err);

        })
}
const getAllText = (req, res) => {
    Text.findAll()
        .then(texts => {
            res.status(200).render("texts",
                {
                    data: texts,
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

const createText = (req, res) => {
    Text.create(req.body)
        .then(text => {
            res.status(200).json({ message: "Text created successfully!" })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ err })
        })
}

const updateText = (req, res) => {
    Text.update(req.body, { where: { id: req.params.id } })
        .then(result => {
            console.log(err);
            res.status(500).json({ err })
        })
        .catch(err => {
            res.status(200).json({ message: "Text updated successfully!" })
        })

}

const deleteText = (req, res) => {
    Text.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(result => {
            console.log(err);
            res.json({ err })
        }).catch(err => {
            res.status(200).json({ message: "Text deleted successfully!" })
        })
}

module.exports = { getText, createText, updateText, deleteText, getAllText }