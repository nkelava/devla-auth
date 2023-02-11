const User = require("./user.model");

exports.getUserById = async (req, resp) => {
  try {
    const user = await User.findOne({ email: req.params.id });

    resp.status(200).json({
      status: "success",
      user,
    });
  } catch (err) {
    resp.status(400).json({
      status: "fail",
    });
  }
};

exports.createUser = async (req, resp) => {
  try {
    const user = await User.create(req.body);

    resp.status(200).json({
      status: "success",
      user,
    });
  } catch (err) {
    resp.status(400).json({
      status: "fail",
    });
  }
};

exports.deleteUserById = async (req, resp) => {
  try {
    await User.findByIdAndDelete(req.params.id);

    resp.status(200).json({
      status: "success",
    });
  } catch (err) {
    resp.status(400).json({
      status: "fail",
    });
  }
};
