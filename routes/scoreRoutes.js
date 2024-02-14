const dbConn = require("../config/db");
const { Router } = require("express");
const { saveScore } = require("../controllers/scoreController");

const router = Router();


const table = "scores"
router.route("/")
    .post(saveScore)


module.exports = router;