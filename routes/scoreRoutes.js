const sequelize = require("../config/database");
const { Router } = require("express");
const { saveScore, getAllScores } = require("../controllers/scoreController");

const router = Router();


const table = "scores"
router.route("/")
    .post(saveScore)
    .get(getAllScores)


module.exports = router;