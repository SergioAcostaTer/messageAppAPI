const express = require("express");
const friendListSchema = require("../models/friendListSchema");

const router = express.Router();

router.post("/friends/remove/:username/:friend", async (req, res) => {
  const { username, friend } = req.params;
  let matchFriendList = await friendListSchema
    .find({ user: username })
    .select("-_id -__v");

  if (matchFriendList[0]) {

    const filtered = matchFriendList[0].friends.filter(names => !names.includes(friend))
    
    const filter = { user: username };
    const deleteParam = { friends: [...filtered] };

    const deletedFriendList = await friendListSchema.findOneAndUpdate(filter, deleteParam)

    matchFriendList = await friendListSchema
    .find({ user: username })
    .select("-_id -__v");

    matchFriendList[0]["status"] = `${friend} removed from friends`;


    res.json(matchFriendList)
  }
  if (!matchFriendList[0]){
    res.json({status: "Friend list doesn't exist"});
  }
});

module.exports = router;
