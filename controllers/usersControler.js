const dbConn = require("../config/db")

let table = "users";

const getUser = (req, res) => {
    dbConn.read(table, { "id": req.params.id }, (err, user) => {
        if (err) {
            res.status(500).json(err);
        }
        if (user.length == 0) {
            return res.status(404).json({ err: "Not Found" })
        }
        res.status(200).json(user);
    })
}

const getAllUers = (req, res) => {
    dbConn.read(table, {}, (err, user) => {
        if (err) {
            res.status(500).json(err);
        }
        if (user.length == 0) {
            return res.status(404).json({ err: "Not Found" })
        }
        console.log(req.user)
        res.status(200).render("users", { data: user, title: "Users", logedUser: req.user});
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