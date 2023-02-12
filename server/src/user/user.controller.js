const User = require("./user.model");

exports.getUserById = async (req, resp) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ _id: id });

    if (!user) resp.status(404).json({ error: "Account does not exist." });

    const userDTO = {
      id: user.id,
      email: user.email,
    };

    resp.status(200).json({ user: userDTO });
  } catch (err) {
    resp.status(400).json({ error: "Bad request." });
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
