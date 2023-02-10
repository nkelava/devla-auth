const User = require("../models/user.model");

exports.getUserById = async (req, resp) => {
  try {
    const user = await User.findById(req.params.id);

    resp.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (err) {
    resp.status(400).json({
      status: "fail",
    });
  }
};

exports.createUser = async (req, resp) => {
  try {
    const user = await User.insertOne(req.body);

    resp.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (err) {
    resp.status(400).json({
      status: "fail",
    });
  }
};

exports.deleteUserById = async (req, resp) => {
  try {
    await User.deleteOne(req.params.id);

    resp.status(200).json({
      status: "success",
    });
  } catch (err) {
    resp.status(400).json({
      status: "fail",
    });
  }
};
