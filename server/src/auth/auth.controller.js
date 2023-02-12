const bcrypt = require("bcrypt");
const { generateToken } = require("../jwt/jwt.utils");
const User = require("../user/user.model");

const register = async (req, resp) => {
  const { email, password } = req.body;

  try {
    const newUser = await User.create({
      email,
      password,
    });

    resp.status(201).json({ user: newUser });
  } catch (err) {
    resp.status(400).json({ message: "Registration failed. Try another username or password." });
  }
};

const login = async (req, resp) => {
  const { email, password } = req.body;
  const { cookies } = req;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return resp.status(404).json({ message: "Account with those credentials doesn't exist." });
    }

    bcrypt.compare(password, user.password).then(async (result) => {
      if (!result) {
        return resp.status(404).json({ message: "There is no user with that email and password." });
      }

      const accessToken = generateToken(user, process.env.ACCESS_TOKEN_SECRET, "30s");
      const newRefreshToken = generateToken(user, process.env.REFRESH_TOKEN_SECRET, "1d");

      // await User.findOneAndUpdate({ email }, { newRefreshToken }, { new: true });
      let newRefreshTokenArray = !cookies
        ? user.refreshToken
        : user.refreshToken.filter((token) => token !== cookies.refresh_token);

      if (cookies?.refresh_token) {
        const refreshToken = cookies.refresh_token;
        const token = User.findOne({ refreshToken }).exec();

        // Detect refresh token reuse
        if (!token) {
          newRefreshTokenArray = [];
        }

        resp.clearCookie("refresh_token", { httpOnly: true, sameSite: "None", secure: true });
      }

      await User.findOneAndUpdate(
        { email },
        { refreshToken: [...newRefreshTokenArray, newRefreshToken] },
        { new: true }
      );

      resp.cookie("refresh_token", newRefreshToken, {
        httpOnly: true,
        sameSite: "None",
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,
      });
      // TODO: delete later on because it is save on client
      resp.cookie("access_token", accessToken, {
        httpOnly: true,
        sameSite: "None",
        secure: true,
        maxAge: 30 * 1000,
      });

      const userDTO = {
        id: user.id,
        email: user.email,
      };

      return resp.status(201).json({ user: userDTO, accessToken });
    });
  } catch (err) {
    return resp.status(400).json({ msg: err.message });
  }
};

const logout = async (req, resp) => {
  const refreshToken = req.cookies.refresh_token;

  if (!refreshToken) return resp.sendStatus(204);

  const user = User.findOne({ refreshToken });

  if (!user) {
    resp.clearCookie("refresh_token", { httpOnly: true, sameSite: "None", secure: true });
    resp.clearCookie("access_token", { httpOnly: true, sameSite: "None", secure: true });
    return resp.sendStatus(204);
  }

  await User.findOneAndUpdate(
    { id: user.id },
    { refreshToken: user.refreshToken.filter((token) => token !== refreshToken) },
    { new: true }
  );

  resp.clearCookie("refresh_token", { httpOnly: true, sameSite: "None", secure: true });
  // TODO: delete later on because it is save on client
  resp.clearCookie("access_token", { httpOnly: true, sameSite: "None", secure: true });
  resp.sendStatus(204);
};

const status = async (req, resp) => {
  const { id } = req;

  const user = await User.findOne({ id });

  resp.status(201).json({ user });
};

module.exports = {
  register,
  login,
  logout,
  status,
};
