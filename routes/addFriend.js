const express = require("express");
const friendListSchema = require("../models/friendListSchema");

const router = express.Router();

router.post("/friends/add/:username/:friend", async (req, res) => {
  const { username, friend } = req.params;
  let userFriendList = await friendListSchema
    .find({ user: username })
    .select("-_id -__v");
  let friendFriendList = await friendListSchema
  .find({ user: friend })
  .select("-_id -__v");

  if (userFriendList[0]) {
    if (userFriendList[0].friends.includes(friend)) {
      userFriendList[0]["status"] = `${friend} is already your friend`;

      res.json(userFriendList);
    }
    if (!userFriendList[0].friends.includes(friend)) {
      const filter1 = { user: username };
      const update1 = { friends: [...userFriendList[0].friends, friend] };

      const filter2 = { user: friend };
      const update2 = { friends: [...friendFriendList[0].friends, username] };


      await friendListSchema.findOneAndUpdate(
        filter1,
        update1
      );
      await friendListSchema.findOneAndUpdate(
        filter2,
        update2
      );

      // matchFriendList = await friendListSchema
      //   .find({ user: username })
      //   .select("-_id -__v");
      // matchFriendList[0]["status"] = `New friend added (${friend})`;

      res.json({status:true});
    }
  }
  if (!userFriendList[0]) {
    const friendList = friendListSchema({
      user: username,
      friends: [friend],
    });

    friendList.save();
    res.json(friendList);
  }
});

module.exports = router;
