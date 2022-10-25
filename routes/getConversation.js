const express = require("express");
const messageSchema = require("../models/messageSchema");

const router = express.Router();

router.get("/get/:username/:receiver", async (req, res) => {
  const { username, receiver } = req.params;

  const messageMatch = await messageSchema
    .find({
      $or: [
        { user: username, receiver: receiver },
        { user: receiver, receiver: username },
      ],
    })
    .select("-_id -__v");

  res.json(messageMatch);
});

module.exports = router;
