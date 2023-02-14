const { registerValidator } = require("../joi/joi.validator");

const validateRegister = (req, resp, next) => {
  const { error } = registerValidator(req.body);

  if (error) {
    return resp.json({ error: error.details });
  }

  next();
};

module.exports = {
  validateRegister,
};
