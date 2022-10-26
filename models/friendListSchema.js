const mongoose = require("mongoose");

const friendListSchema = mongoose.Schema({
  status:{
    type: String,
  },
  user: {
    type: String,
  },
  friends: {
    type: Array,
    default: []
  },
  friendsRequests: {
    type: Array,
    default: []
  },
});

module.exports = mongoose.model("friend", friendListSchema);
