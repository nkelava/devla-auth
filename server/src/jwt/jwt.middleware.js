const { verify } = require("jsonwebtoken");
const { handleRefreshToken } = require("./jwt.controller");

const validateToken = (req, resp, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (!authHeader?.startsWith("Bearer ")) return resp.status(401).json({ error: "Not Authenticated." });

  const accessToken = authHeader.split(" ")[1];

  verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    // if (err) return resp.sendStatus(403);
    if (err) return handleRefreshToken(req, resp);

    req.id = decoded.id;
    next();
  });
};

module.exports = {
  validateToken,
};
