const express = require("express");
const authController = require("./auth.controller");
const { validateToken } = require("../jwt/jwt.middleware");
const { validateLogin } = require("./auth.middleware");

const router = express.Router();

router.post("/login", validateLogin, authController.login);
router.post("/logout", authController.logout);
router.get("/status", validateToken, authController.status);

module.exports = router;
