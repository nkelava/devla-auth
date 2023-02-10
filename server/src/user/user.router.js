const express = require("express");
const userController = require("./user.controller");

const router = express.Router();

router.route("/").post(userController.createUser);
router.route("/:id").get(userController.getUserById).delete(userController.deleteUserById);

module.exports = router;
