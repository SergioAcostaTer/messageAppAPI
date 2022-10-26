const express = require("express");
const userSchema = require("../models/userSchema");
const friendListSchema = require("../models/friendListSchema");

const router = express.Router();

router.post("/adduser/:username/:password", (req, res) => {
  const { username, password } = req.params;

  const user = userSchema({
    status: true,
    user: username,
    password: password,
  });
  const friendList = friendListSchema({
    user: username,
  });

  user.save();
  friendList.save();

  res.json({ status: true });
});

module.exports = router;
