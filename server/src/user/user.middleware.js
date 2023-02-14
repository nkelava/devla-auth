const { registerValidator } = require("../joi/joi.validator");

const validateRegister = (req, resp, next) => {
  const { error } = registerValidator(req.body);

  if (error) return resp.status(400).json({ error: error.details[0].message });

  next();
};

module.exports = {
  validateRegister,
};
