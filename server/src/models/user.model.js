const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    require: [true, "User must have email."],
  },
  password: {
    type: String,
    require: [true, "User must have password."],
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
