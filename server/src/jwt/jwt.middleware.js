const { verify } = require("jsonwebtoken");

const validateToken = (req, resp, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (!authHeader?.startsWith("Bearer ")) return resp.status(401).json({ error: "Not Authenticated." });

  const accessToken = authHeader.split(" ")[1];

  verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err || !decoded.id) return resp.status(403).json({ error: "Invalid token." });

    req.id = decoded.id;
    next();
  });
};

module.exports = {
  validateToken,
};
