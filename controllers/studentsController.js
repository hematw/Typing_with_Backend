const dbConn = require("../config/database");
const { Student } = require("../models/associations")

let table = "students";

const getStudent = (req, res) => {
    Student.findOne({ "id": req.params.id })
        .then(student => {
            if (!student) {
                return res.status(404).json({ err: "Not Found" })
            }
            res.status(200).json(student);
        })
        .catch(err => {
            res.status(500).json(err);
        })
}

const getAllStudents = (req, res) => {
    Student.findAll()
        .then(result => {
            let pageSize = 10;
            let page = parseInt(req.query.page) || 1;
            let totalPages = Math.ceil(result.length / pageSize);
            let startIndex = (page - 1) * pageSize;
            let endIndex = page * pageSize;
            let paginatedResult = result.slice(startIndex, endIndex);

            if (paginatedResult.length === 0 && page > 1) {
                return res.redirect(`/students?page=${totalPages}`);
            }
            res.status(200).render("students", {
                students: req.t("students"),
                users: req.t("users"),
                texts: req.t("texts"),
                records: req.t("records"),
                settings: req.t("settings"),
                classes: req.t("classes"),
                no: req.t("no"),
                fName: req.t("fName"),
                lName: req.t("lName"),
                actions: req.t("actions"),
                add: req.t("add"),
                sclass: req.t("class"),
                lang: req.t("lang"),
                logout: req.t("logout"),
                data: paginatedResult,
                totalPages: totalPages,
                startNum: startIndex,
                currentPage: page,
                title: "Students",
                logedUser: req.user,
                errors: req.flash("err"),
                msgs: req.flash("msg")
            })
        }).catch(err => {
            return res.status(500).render("students", { errors: err });
        })
}

const createStudent = (req, res) => {
    if (req.method === "GET") {
        res.render("form", { title: "New Student" })
    } else if (req.method === "POST") {
        const data = {
            firstName: req.body.first_name,
            lastName: req.body.last_name,
            classId: req.body.class_id
        }

        Student.create(data)
            .then(student => {
                console.log(student)
                req.flash("msg", "Student Added successfully!")
                res.status(200).redirect("/students")
            })
            .catch(err => {
                req.flash("err", err.message)
                res.status(500).redirect("/students");
            })
    }
}

const updateStudent = (req, res) => {
    const data = req.body;
    const condition = { "id": req.params.id }

    Student.update()

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