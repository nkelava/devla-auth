const { loginSchema, registerSchema } = require("./joi.schema");

const validator = (schema) => (payload) => schema.validate(payload, { abortEarly: false });

module.exports = {
  loginValidator: validator(loginSchema),
  registerValidator: validator(registerSchema),
};
