const bcrypt = require("bcrypt");
const { createToken } = require("./auth.helper");
const User = require("../user/user.model");

exports.register = async (req, resp) => {
  const { email, password } = req.body;

  try {
    const newUser = await User.create({
      email,
      password,
    });

    resp.status(201).json({
      status: "success",
      user: newUser,
    });
  } catch (err) {
    resp.status(400).json({
      status: "fail",
      message: "Registration failed. Try another username or password.",
    });
  }
};

// Add middleware before that checks if user exists
exports.login = async (req, resp) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return resp.status(404).json({
        status: "fail",
        message: "There is no user with that email and password.",
      });
    }

    bcrypt.compare(password, user.password).then((result) => {
      if (!result) {
        return resp.status(404).json({
          status: "fail",
          message: "There is no user with that email and password.",
        });
      }

      const accessToken = createToken(user);

      return resp.status(201).json({
        status: "success",
        accessToken,
      });
    });
  } catch (err) {
    resp.status(400).json({
      status: "fail",
      msg: err.message,
    });
  }
};
