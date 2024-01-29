const dbConn = require("../config/db");

let table = "students";

const getStudent = (req, res) => {
    dbConn.read(table, { "id": req.params.id }, (err, student) => {
        if (err) {
            res.status(500).json(err);
        }
        if (student.length == 0) {
            return res.status(404).json({ err: "Not Found" })
        }
        res.status(200).json(student);
    })
}

const getAllStudents = (req, res) => {
    dbConn.read(table, {}, (err, result) => {
        if (err) {
            res.status(500).json(err);
        }
        if (result.length == 0) {
            return res.status(404).json({ err: "Not Found" })
        }
        res.status(200).render("students", { students: result, title: "Students", user: req.user });
    })
}

const createStudent = (req, res) => {
    const data = req.body;

    dbConn.create(table, data, (err, result) => {
        if (err) {
            res.status(500).json(err);
        }
        if (result.affectedRows == 0) {
            return res.status(404).json({ err: "Not Found" })
        }
        res.status(200).json({ message: "Student created successfully!" })
    })
}

const updateStudent = (req, res) => {
    const data = req.body;
    const condition = { "id": req.params.id }

    dbConn.update(table, data, condition, (err, result) => {
        if (err) {
            res.status(500).json(err);
        }
        if (result.affectedRows == 0) {
            return res.status(404).json({ err: "Not Found" })
        }
        res.status(200).json({ message: "Student updated successfully!" })
    })
}

const deleteStudent = (req, res) => {
    const data = req.body;
    const condition = { id: req.params.id };


    dbConn.delete(table, condition, (err, result) => {
        if (err) {
            res.status(500).json(err);
        }
        if (result.affectedRows == 0) {
            return res.status(404).json({ err: "Not Found" })
        }
        res.status(200).json({ message: "Students deleted successfully!" })
    })
}


module.exports = { getAllStudents, getStudent, createStudent, updateStudent, deleteStudent }