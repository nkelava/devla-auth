const { verify } = require("jsonwebtoken");

const validateToken = (req, resp, next) => {
  const accessToken = req.cookies.access_token;

  if (!accessToken) return resp.status(401).json({ error: "Not Authenticated." });

  verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return resp.sendStatus(403);

    req.id = decoded.id;
    next();
  });
};

module.exports = {
  validateToken,
};
