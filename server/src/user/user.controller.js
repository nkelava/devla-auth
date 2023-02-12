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
    const { email, password } = req.body;

    if (!email || !password) return resp.status(400).json({ error: "Please make sure to enter all the data." });

    const newUser = await User.create({
      email,
      password,
    });

    resp.status(201).json({ user: newUser });
  } catch (err) {
    resp.status(400).json({ error: "Oops. Please, try again with another email." });
  }
};

exports.deleteUserById = async (req, resp) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);

    if (!user) return resp.sendStatus(400);

    resp.sendStatus(204);
  } catch (err) {
    resp.status(400).json({ status: "Bad request." });
  }
};
