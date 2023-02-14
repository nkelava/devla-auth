const express = require("express");
const jwtController = require("./jwt.controller");

const router = express.Router();

router.get("/refresh", jwtController.handleRefreshToken);

module.exports = router;
