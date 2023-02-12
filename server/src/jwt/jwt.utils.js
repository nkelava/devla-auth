const { sign } = require("jsonwebtoken");

const generateToken = (user, secret, expiresIn) => {
  const userDTO = {
    id: user.id,
  };

  return sign(userDTO, secret, { expiresIn });
};

module.exports = {
  generateToken,
};
