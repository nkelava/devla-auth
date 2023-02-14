const User = require("./user.model");
const errorMessages = require("../error/error.consts");

exports.getUserById = async (req, resp) => {
  try {
    const { id } = req.params;

    if (!id) return resp.status(400).json({ error: errorMessages.BAD_REQUEST });

    const user = await User.findOne({ _id: id });

    if (!user) return resp.status(404).json({ error: errorMessages.ACCOUNT_NOT_FOUND });

    const userDTO = {
      id: user.id,
      email: user.email,
    };

    resp.status(200).json({ user: userDTO });
  } catch (err) {
    resp.status(500).json({ error: errorMessages.INTERNAL_SERVER_ERROR });
  }
};

exports.createUser = async (req, resp) => {
  try {
    const { email, password } = req.body;

    const newUser = await User.create({
      email,
      password,
    });

    resp.status(201).json({ user: newUser });
  } catch {
    resp.status(400).json({ error: errorMessages.ACCOUNT_ALREADY_EXISTS });
  }
};

exports.deleteUserById = async (req, resp) => {
  try {
    const { id } = req.params;

    if (!id) return resp.status(400).json({ error: errorMessages.BAD_REQUEST });

    const user = await User.findByIdAndDelete({ _id: id });

    if (!user) return resp.status(400).json({ error: errorMessages.ACCOUNT_NOT_FOUND });

    resp.sendStatus(204);
  } catch (error) {
    resp.status(500).json({ error: errorMessages.INTERNAL_SERVER_ERROR });
  }
};
