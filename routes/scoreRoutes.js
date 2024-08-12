const { Router } = require("express");
const {
  saveScore,
  getAllScores,
  deleteScore,
} = require("../controllers/scoreController");
const isAdmin = require("../middlewares/isAdmin");

const router = Router();

router.route("/").post(saveScore).get(isAdmin(), getAllScores);
router.route("/:id").delete(isAdmin(), deleteScore);

module.exports = router;