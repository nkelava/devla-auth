const { sign } = require("jsonwebtoken");

const generateToken = (user, secret, expiresIn) => {
  const userDTO = {
    id: user.id,
    email: user.email,
  };

  return sign(userDTO, secret, { expiresIn });
};

module.exports = {
  generateToken,
};
