const express = require("express");
const friendListSchema = require("../models/friendListSchema");

const router = express.Router();

router.post("/friends/request/:username/:friend", async (req, res) => {
  const { username, friend } = req.params;

  const filter = { user: friend };
  const match = await friendListSchema.find(filter);
  console.log(match)


  if (!match[0].friendsRequests.includes(username)) {
    const update = { friendsRequests: [...match[0].friendsRequests, username] };

    const updateFriendRequests = await friendListSchema.findOneAndUpdate(
      filter,
      update
    );

    res.json({state:true});
  }
  if (match[0].friendsRequests.includes(username)) {
   

    res.json({state:false});
  }
});

module.exports = router;
