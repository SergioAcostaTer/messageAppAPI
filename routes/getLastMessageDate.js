const express = require("express");
const messageSchema = require("../models/messageSchema");

const router = express.Router();

router.get("/get/date/:username/:receiver", async (req, res) => {
  const { username, receiver } = req.params;

  const messageMatch = await messageSchema
    .find({
      $or: [
        { user: username, receiver: receiver },
        { user: receiver, receiver: username },
      ],
    })
    .sort({ _id: -1 })
    .limit(1)
    .select("date -_id");

    if(messageMatch[0]){
      res.json(messageMatch[0].date);
    }
    if(!messageMatch[0]){
      res.json("0");
    }
});

module.exports = router;
