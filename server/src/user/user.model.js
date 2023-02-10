const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
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
});

const User = mongoose.model("User", userSchema);

module.exports = User;
