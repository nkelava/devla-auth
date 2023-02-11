const { sign } = require("jsonwebtoken");

const createToken = (user) => {
  const userDTO = {
    id: user.id,
    email: user.email,
  };

  return sign(userDTO, process.env.ACCESS_TOKEN_SECRET);
};

module.exports = {
  createToken,
};
