const mongoose = require("mongoose");

const messageSchema = mongoose.Schema({
  user: {
    type: String,
  },
  receiver: {
    type: String,
  },
  message: {
    type: String,
  },
  date: {
    type: String,
  },
});

module.exports = mongoose.model("message", messageSchema);
