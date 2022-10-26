const express = require("express");
const friendListSchema = require("../models/friendListSchema");

const router = express.Router();

router.post("/friends/request/remove/:username/:friend", async (req, res) => {
  const { username, friend } = req.params;
  let matchFriendList = await friendListSchema
    .find({ user: username })
    .select("-_id -__v");

  const filter = { username };
  const filtered = matchFriendList[0].friendsRequests.filter(
    (name) => name != friend
  );
  const update = { friendRequests: filtered };

  await friendListSchema.findByIdAndUpdate(filter, update);

  res.json({status:true});
});

module.exports = router;
