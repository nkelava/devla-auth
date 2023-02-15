const { verify } = require("jsonwebtoken");
const { jwtConfig } = require("./config");
const errorMessages = require("../error/error.consts");

const validateToken = (req, resp, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (!authHeader?.startsWith("Bearer ")) return resp.status(401).json({ error: errorMessages.ACCOUNT_UNAUTHORIZED });

  const accessToken = authHeader.split(" ")[1];

  verify(accessToken, jwtConfig.access_token.secret, (err, decoded) => {
    if (err || !decoded.id) return resp.status(403).json({ error: errorMessages.ACCOUNT_FORBIDDEN });

    req.id = decoded.id;
    next();
  });
};

module.exports = {
  validateToken,
};
