const dbConn = require("../config/database")

let table = "texts";

const getText = (req, res) => {
    dbConn.read(table, { "id": req.params.id }, (err, result) => {
        if (err) {
            res.status(500).json(err);
        }
        if (result) {
            res.status(200).json(result);
        }
    })
}

const createText = (req, res) => {
    dbConn.create(table, req.body, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).json({ err })
        }
        if (result.affectedRows !== 0) {
            res.status(200).json({ message: "Text created successfully!" })
        }
    })
}

const updateText = (req, res) => {
    dbConn.update(table, req.body, { id: req.params.id }, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).json({ err })
        }
        if (result.affectedRows !== 0) {
            res.status(200).json({ message: "Text updated successfully!" })
        }
    })
}

const deleteText = (req, res) => {
    dbConn.delete(table, { id: req.params.id }, (err, result) => {
        if (err) {
            console.log(err);
            res.json({ err })
        }
        if (result.affectedRows !== 0) {
            res.status(200).json({ message: "Text deleted successfully!" })
        }
    })
}

module.exports = { getText, createText, updateText, deleteText }