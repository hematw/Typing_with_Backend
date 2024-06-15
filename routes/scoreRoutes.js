const sequelize = require("../config/database");
const { Router } = require("express");
const { saveScore } = require("../controllers/scoreController");

const router = Router();


const table = "scores"
router.route("/")
    .post(saveScore)


module.exports = router;