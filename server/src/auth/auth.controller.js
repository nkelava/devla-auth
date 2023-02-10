const bcrypt = require("bcrypt");
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
      data: {
        user: newUser,
      },
    });
  } catch (err) {
    resp.status(400).json({
      status: "fail",
    });
  }
};

// Add middleware before that checks if user exists
exports.login = async (req, resp) => {
  const { email, password } = req.body;

  try {
    const existedUser = await User.findOne({ email });

    if (!existedUser) {
      return resp.status(404).json({
        status: "fail",
        message: "There is no user with that email and password.",
      });
    }

    bcrypt.compare(password, existedUser.password).then((result) => {
      return result
        ? resp.status(201).json({
            status: "success",
            data: {
              user: existedUser,
            },
          })
        : resp.status(404).json({
            status: "fail",
            message: "There is no user with that email and password.",
          });
    });
  } catch (err) {
    resp.status(400).json({
      status: "fail",
      msg: err.message,
    });
  }
};
