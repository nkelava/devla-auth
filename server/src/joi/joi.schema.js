const joi = require("joi");

const loginSchema = joi.object({
  email: joi.string().email().required().messages({
    "string.email": "Wrong email format e.g. example@gmail.com. 😊",
    "string.empty": "Email cannot be an empty field. 😊",
  }),
  password: joi.string().required().min(8).messages({
    "string.min": "Password should be at least 8 characters long. 😊",
    "string.empty": "Password cannot be an empty field. 😊",
  }),
});

const registerSchema = joi.object({
  email: joi.string().email().required().messages({
    "string.email": "Wrong email format e.g. example@gmail.com. 😊",
    "string.empty": "Email cannot be an empty field. 😊",
  }),
  password: joi.string().required().min(8).messages({
    "string.min": "Password should be at least 8 characters long. 😊",
    "string.empty": "Password cannot be an empty field. 😊",
  }),
});

module.exports = {
  registerSchema,
  loginSchema,
};
