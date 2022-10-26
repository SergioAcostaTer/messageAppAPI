const express = require("express");
const friendListSchema = require("../models/friendListSchema");

const router = express.Router();

router.get("/friends/request/get/:username", async (req, res) => {
  const { username } = req.params;
  let matchFriendList = await friendListSchema
    .find({ user: username })
    .select("-_id -__v");

  if (matchFriendList[0]) {
    res.json(matchFriendList[0].friendsRequests)
  }
  if (!matchFriendList[0]) {
    res.json({status: "Doesn't exist"})
  }
});

module.exports = router;
