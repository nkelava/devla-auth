const express = require("express");
const authController = require("./auth.controller");
const { validateToken } = require("../jwt/jwt.middleware");

const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/status", validateToken, authController.status);

module.exports = router;
