const { verify } = require("jsonwebtoken");
const User = require("../user/user.model");
const { generateToken } = require("./jwt.utils");

const handleRefreshToken = async (req, resp) => {
  const refreshToken = req.cookies.refresh_token;

  if (!refreshToken) return resp.status(401);

  const user = await User.findOne({ refreshToken });

  if (!user) return resp.sendStatus(403);

  verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || user.id !== decoded.id) return resp.sendStatus(403);

    const accessToken = generateToken(user, process.env.ACCESS_TOKEN_SECRET, "30s");

    resp.json({ accessToken });
  });
};

module.exports = {
  handleRefreshToken,
};
