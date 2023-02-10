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
