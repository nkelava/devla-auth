const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    require: [true, "User must have email."],
    unique: true,
  },
  password: {
    type: String,
    require: [true, "User must have password."],
    minLength: [8, "Password is too short."],
  },
  refreshToken: [String],
});

UserSchema.pre("save", async function preSave(next) {
  const user = this;
  const saltRounds = 8;

  if (!user.isModified("password")) return next();

  user.password = await bcrypt.hash(user.password, saltRounds);

  next();
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
