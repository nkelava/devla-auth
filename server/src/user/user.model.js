const mongoose = require("mongoose");

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
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
