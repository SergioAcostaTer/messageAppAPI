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
  user.save();

  const friendList = friendListSchema({
    user: username
  });
  friendList.save()

  console.log(friendList)


  res.json({status: true});
});

module.exports = router;
