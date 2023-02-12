const express = require("express");
const jwtController = require("./jwt.controller");

const router = express.Router();

router.post("/refresh", jwtController.handleRefreshToken);

module.exports = router;
