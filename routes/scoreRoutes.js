const { Router } = require("express");
const { saveScore, getAllScores, deleteScore } = require("../controllers/scoreController");

const router = Router();


router.route("/")
    .post(saveScore)
    .get(getAllScores)

router.route("/:id")
    .delete(deleteScore)




module.exports = router;