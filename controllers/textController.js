const dbConn = require("../config/database")
const { Text } = require("../models/associations")

let table = "texts";

const getText = (req, res) => {
    Text.findOne({ id: req.params.id })
        .then(text => {
            res.status(200).json(result);
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

module.exports = { getText, createText, updateText, deleteText }