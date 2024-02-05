const express = require("express");
const {
    getAllStudents,
    getStudent,
    createStudent,
    updateStudent,
    deleteStudent
} = require("../controllers/studentsController");

const router = express.Router();

router.route("/new").get(createStudent)
router.route("/").get(getAllStudents).post(createStudent);
router.route("/:id").get(getStudent).put(updateStudent).delete(deleteStudent);

module.exports = router;