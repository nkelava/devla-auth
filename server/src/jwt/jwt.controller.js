const { verify } = require("jsonwebtoken");
const User = require("../user/user.model");
const { generateToken } = require("./jwt.utils");
const { cookieConfig, jwtConfig } = require("./config");

const handleRefreshToken = async (req, resp) => {
  const refreshToken = req.cookies.refresh_token;

  if (!refreshToken) return resp.sendStatus(401);

  resp.clearCookie(cookieConfig.refresh_token.name, cookieConfig.refresh_token.options);

  const user = await User.findOne({ refreshToken });

  // Detected refresh token reuse
  if (!user) {
    verify(refreshToken, jwtConfig.refresh_token.secret, async (err, decoded) => {
      if (err) return resp.sendStatus(403);

      await User.findOneAndUpdate({ id: decoded.id }, { refreshToken: [] }, { new: true });
    });

    return resp.sendStatus(403);
  }

  const newRefreshTokenArray = user.refreshToken.filter((token) => token !== refreshToken);

  verify(refreshToken, jwtConfig.refresh_token.secret, async (err, decoded) => {
    if (err) {
      await User.findOneAndUpdate({ id: decoded.id }, { refreshToken: [...newRefreshTokenArray] }, { new: true });
    }
    if (err || user.id !== decoded.id) return resp.sendStatus(403);

    const accessToken = generateToken(user, jwtConfig.access_token.secret, jwtConfig.access_token.exp);
    const newRefreshToken = generateToken(user, jwtConfig.refresh_token.secret, jwtConfig.refresh_token.exp);

    await User.findOneAndUpdate(
      { id: decoded.id },
      { refreshToken: [...newRefreshTokenArray, newRefreshToken] },
      { new: true }
    );

    resp.cookie(cookieConfig.refresh_token.name, newRefreshToken, cookieConfig.refresh_token.options);
    resp.json({ accessToken });
  });
};

module.exports = {
  handleRefreshToken,
};
