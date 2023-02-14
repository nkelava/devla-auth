const User = require("./user.model");

exports.getUserById = async (req, resp) => {
  try {
    const { id } = req.params;

    if (!id) return resp.status(400).json({ error: "Bad request." });

    const user = await User.findOne({ _id: id });

    if (!user) return resp.status(404).json({ error: "Account does not exist." });

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
    const { email, password } = req.body;

    if (!email || !password) return resp.status(400).json({ error: "Bad request." });

    const newUser = await User.create({
      email,
      password,
    });

    resp.status(201).json({ user: newUser });
  } catch (err) {
    resp.status(400).json({ error: "Bad request." });
  }
};

exports.deleteUserById = async (req, resp) => {
  try {
    const { id } = req.params;

    if (!id) return resp.status(400).json({ error: "Bad request." });

    const user = await User.findByIdAndDelete({ _id: id });

    if (!user) return resp.status(400).json({ error: "Bad request." });

    resp.sendStatus(204);
  } catch (err) {
    resp.status(400).json({ status: "Bad request." });
  }
};
