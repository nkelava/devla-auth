const { loginValidator } = require("../joi/joi.validator");

const validateLogin = (req, resp, next) => {
  const { error } = loginValidator(req.body);

  if (error) return resp.status(400).json({ error: error.details[0].message });

  next();
};

module.exports = {
  validateLogin,
};
