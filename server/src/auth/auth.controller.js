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

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return resp.status(404).json({ message: "There is no user with that email and password." });
    }

    bcrypt.compare(password, user.password).then(async (result) => {
      if (!result) {
        return resp.status(404).json({ message: "There is no user with that email and password." });
      }

      const accessToken = generateToken(user, process.env.ACCESS_TOKEN_SECRET, "30s");
      const refreshToken = generateToken(user, process.env.REFRESH_TOKEN_SECRET, "1d");

      await User.findOneAndUpdate({ email }, { refreshToken }, { new: true });

      resp.cookie("refresh_token", refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
      resp.cookie("access_token", accessToken, { httpOnly: true, maxAge: 30 * 1000 });

      return resp.status(201).json({ accessToken });
    });
  } catch (err) {
    return resp.status(400).json({ msg: err.message });
  }
};

const logout = (req, resp) => {
  resp.send(201);
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
