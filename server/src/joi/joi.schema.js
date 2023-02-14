const joi = require("joi");
const errorMessages = require("../error/error.consts");

const loginSchema = joi.object({
  email: joi.string().email().required().messages({
    "string.email": errorMessages.EMAIL_WRONG_FORMAT,
    "string.empty": errorMessages.EMAIL_EMPTY,
  }),
  password: joi.string().required().min(8).messages({
    "string.min": errorMessages.PASSWORD_SHORT,
    "string.empty": errorMessages.PASSWORD_EMPTY,
  }),
});

const registerSchema = joi.object({
  email: joi.string().email().required().messages({
    "string.email": errorMessages.EMAIL_WRONG_FORMAT,
    "string.empty": errorMessages.EMAIL_EMPTY,
  }),
  password: joi.string().required().min(8).messages({
    "string.min": errorMessages.PASSWORD_SHORT,
    "string.empty": errorMessages.PASSWORD_EMPTY,
  }),
});

module.exports = {
  registerSchema,
  loginSchema,
};
