const bcrypt = require("bcrypt");
const { generateToken } = require("./auth.utils");
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

    bcrypt.compare(password, user.password).then((result) => {
      if (!result) {
        return resp.status(404).json({ message: "There is no user with that email and password." });
      }

      const accessToken = generateToken(user);
      resp.cookie("access_token", accessToken, { maxAge: 60000, httpOnly: true });

      return resp.status(201).json({ accessToken });
    });
  } catch (err) {
    return resp.status(400).json({ msg: err.message });
  }
};

const status = async (req, resp) => {
  const { id } = req;

  const user = await User.findOne({ id });

  resp.status(201).json({ user });
};

module.exports = {
  register,
  login,
  status,
};
