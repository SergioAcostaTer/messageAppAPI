const express = require("express");
const friendListSchema = require("../models/friendListSchema");

const router = express.Router();

router.post("/friends/add/:username/:friend", async (req, res) => {
  const { username, friend } = req.params;
  let matchFriendList = await friendListSchema
    .find({ user: username })
    .select("-_id -__v");

  if (matchFriendList[0]) {
    if (matchFriendList[0].friends.includes(friend)) {
      matchFriendList[0]["status"] = `${friend} is already your friend`;

      res.json(matchFriendList);
    }
    if (!matchFriendList[0].friends.includes(friend)) {
      const filter = { user: username };
      const update = { friends: [...matchFriendList[0].friends, friend] };

      const updateFriendList = await friendListSchema.findOneAndUpdate(
        filter,
        update
      );

      matchFriendList = await friendListSchema
        .find({ user: username })
        .select("-_id -__v");
      matchFriendList[0]["status"] = `New friend added (${friend})`;

      res.json(matchFriendList);
    }
  }
  if (!matchFriendList[0]) {
    const friendList = friendListSchema({
      user: username,
      friends: [friend],
    });

    friendList.save();
    res.json(friendList);
  }
});

module.exports = router;
