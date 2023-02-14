const bcrypt = require("bcrypt");
const { generateToken } = require("../jwt/jwt.utils");
const { cookieConfig } = require("../jwt/cookie.config");
const User = require("../user/user.model");
const { jwtConfig } = require("../jwt/jwt.config");

const login = async (req, resp) => {
  const { email, password } = req.body;
  const { cookies } = req;

  if (!email || !password) return resp.status(400).json({ error: "Bad request." });

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return resp.status(404).json({ error: "Account with those credentials does not exist." });
    }

    bcrypt.compare(password, user.password).then(async (isEqual) => {
      if (!isEqual) {
        return resp.status(404).json({ error: "Account with those credentials does not exist." });
      }

      const accessToken = generateToken(user, jwtConfig.access_token.secret, jwtConfig.access_token.exp);
      const newRefreshToken = generateToken(user, jwtConfig.refresh_token.secret, jwtConfig.refresh_token.exp);

      let newRefreshTokenArray = !cookies
        ? user.refreshToken
        : user.refreshToken.filter((token) => token !== cookies.refresh_token);

      if (cookies?.refresh_token) {
        const refreshToken = cookies.refresh_token;
        const token = await User.findOne({ refreshToken });

        // Detect refresh token reuse
        if (!token) {
          newRefreshTokenArray = [];
        }

        resp.clearCookie(cookieConfig.refresh_token.name, cookieConfig.refresh_token.options);
      }

      await User.findOneAndUpdate(
        { email },
        { refreshToken: [...newRefreshTokenArray, newRefreshToken] },
        { new: true }
      );

      resp.cookie(cookieConfig.refresh_token.name, newRefreshToken, cookieConfig.refresh_token.options);

      const userDTO = {
        id: user.id,
        email: user.email,
        accessToken,
      };

      return resp.status(201).json({ user: userDTO });
    });
  } catch (err) {
    return resp.status(400).json({ error: err.message });
  }
};

const logout = async (req, resp) => {
  const refreshToken = req.cookies.refresh_token;

  if (!refreshToken) return resp.sendStatus(204);

  const user = await User.findOne({ refreshToken });

  // Check if refresh token is in database
  if (user) {
    await User.findOneAndUpdate(
      { _id: user.id },
      { refreshToken: user.refreshToken.filter((token) => token !== refreshToken) },
      { new: true }
    );
  }

  resp.clearCookie(cookieConfig.refresh_token.name, cookieConfig.refresh_token.options);
  resp.sendStatus(204);
};

const status = async (req, resp) => {
  try {
    const { id } = req;
    const user = await User.findOne({ id });

    if (!user) return resp.status(404).json({ error: "Not found." });

    resp.status(201).json({ user });
  } catch (error) {
    resp.status(400).json({ error: "Bad request." });
  }
};

module.exports = {
  login,
  logout,
  status,
};
