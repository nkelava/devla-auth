const express = require("express");
const authController = require("./auth.controller");
const { validateToken } = require("../jwt/jwt.middleware");

const router = express.Router();

router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.get("/status", validateToken, authController.status);

module.exports = router;
