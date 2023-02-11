const { sign } = require("jsonwebtoken");

const generateToken = (user) => {
  const userDTO = {
    id: user.id,
    email: user.email,
  };

  return sign(userDTO, process.env.ACCESS_TOKEN_SECRET);
};

module.exports = {
  createToken: generateToken,
};
