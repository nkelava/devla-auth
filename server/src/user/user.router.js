const express = require("express");
const userController = require("./user.controller");
const { validateRegister } = require("./user.middleware");

const router = express.Router();

router.post("/", validateRegister, userController.createUser);
router.route("/:id").get(userController.getUserById).delete(userController.deleteUserById);

module.exports = router;
