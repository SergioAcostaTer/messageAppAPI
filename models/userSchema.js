const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  status: {
    type: Boolean,
    default: false,
  },
  user: {
    type: String,
  },
  password: {
    type: String,
  },
});

module.exports = mongoose.model("users", userSchema);
