const { Router } = require("express");
const { createText, getText, deleteText, updateText } = require("../controllers/textController");
const router = new Router();

router.route("/")
    .get(getText).post(createText);

router.route("/:id")
    .get(getText).delete(deleteText).put(updateText);

module.exports = router;