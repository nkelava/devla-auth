const joi = require("joi");

const loginSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required().min(8),
});

const registerSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required().min(8),
});

module.exports = {
  registerSchema,
  loginSchema,
};
