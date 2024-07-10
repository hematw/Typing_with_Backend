const { Router } = require("express");
const { createText, getText, deleteText, updateText, getAllText } = require("../controllers/textController");
const router = new Router();

router.route("/")
    .get(getAllText).post(createText);

router.route("/:id")
    .get(getText).delete(deleteText).put(updateText);

module.exports = router;