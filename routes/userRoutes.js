const { Router } = require("express");
const { getUser, getAllUers, createUser, deleteUser, updateUser } = require("../controllers/usersControler");

const router = Router();

router.route("/")
.get(getAllUers).post(createUser);

router.route("/:id")
.get(getUser).delete(deleteUser).put(updateUser);

module.exports = router;