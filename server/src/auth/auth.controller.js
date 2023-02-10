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

exports.login = async (req, resp) => {
  const { email, password } = req.body;

  try {
    const existedUser = await User.findOne({
      email,
      password,
    });

    if (!existedUser) {
      resp.status(404).json({
        status: "fail",
        message: "There is no user with that email and password.",
      });
    }

    resp.status(201).json({
      status: "success",
      data: {
        user: existedUser,
      },
    });
  } catch (err) {
    resp.status(400).json({
      status: "fail",
    });
  }
};
