const { verify } = require("jsonwebtoken");
const User = require("../user/user.model");
const { generateToken } = require("./jwt.utils");

const handleRefreshToken = async (req, resp) => {
  const refreshToken = req.cookies.refresh_token;

  if (!refreshToken) return resp.sendStatus(401);

  resp.clearCookie("refresh_token", { http: true, maxAge: 30 * 1000 });

  const user = await User.findOne({ refreshToken });

  // Detected refresh token reuse

  if (!user) {
    verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, decoded) => {
      if (err) return resp.sendStatus(403);

      await User.findOneAndUpdate({ id: decoded.id }, { refreshToken: [] }, { new: true });
    });

    return resp.sendStatus(403);
  }

  const newRefreshTokenArray = user.refreshToken.filter((token) => token !== refreshToken);

  verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, decoded) => {
    if (err) {
      await User.findOneAndUpdate({ id: decoded.id }, { refreshToken: [...newRefreshTokenArray] }, { new: true });
    }
    if (err || user.id !== decoded.id) return resp.sendStatus(403);

    const accessToken = generateToken(user, process.env.ACCESS_TOKEN_SECRET, "30s");
    const newRefreshToken = generateToken(user, process.env.REFRESH_TOKEN_SECRET, "1d");

    await User.findOneAndUpdate(
      { id: decoded.id },
      { refreshToken: [...newRefreshTokenArray, newRefreshToken] },
      { new: true }
    );

    resp.cookie("refresh_token", newRefreshToken, {
      httpOnly: true,
      sameSite: "None",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    resp.json({ accessToken });
  });
};

module.exports = {
  handleRefreshToken,
};
