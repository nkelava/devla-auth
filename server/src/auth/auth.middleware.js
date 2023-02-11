const { verify } = require("jsonwebtoken");

const validateToken = (req, resp, next) => {
  const accessToken = req.cookies.access_token;

  if (!accessToken) return resp.status(401).json({ error: "Not Authenticated." });

  try {
    const validTokenData = verify(accessToken, process.env.ACCESS_TOKEN_SECRET);

    if (validTokenData) {
      req.id = validTokenData.id;
      return next();
    }
  } catch (err) {
    return resp.status(400).json({ error: err });
  }
};

module.exports = {
  validateToken,
};
