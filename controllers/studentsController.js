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
            return res.status(500).render("students", { errors: err });
        }
        if (result.length == 0) {
            return res.status(404).render("students", { errors: err })
        }
        res.status(200).render("students", {
            data: result,
            title: "Students",
            logedUser: req.user,
            errors: req.flash("err"),
            msgs: req.flash("msg")
        });
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
    const condition = { id: req.params.id };


    dbConn.delete(table, condition, (err, result) => {
        if (err) {
            if (err.errno === 1451) {
                req.flash("err", `You can't Remove this record beacause there is other related data!`);
                return res.status(302).redirect("/students");
            }

            req.flash("err", `Internal server error!`);
            return res.status(500).redirect("/students");
        }

        if (result.affectedRows == 0) {
            req.flash("err", `Record not Found! `);
            return res.status(404).redirect("/students");
        }
        req.flash("msg", "Student deleted successfully!");
        res.status(302).redirect("/students");
    })
}


module.exports = { getAllStudents, getStudent, createStudent, updateStudent, deleteStudent }