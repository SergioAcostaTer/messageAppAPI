const express = require("express");
const messageSchema = require("../models/messageSchema");

const router = express.Router();

router.post("/post/:username/:receiver", async (req, res) => {
  const { username, receiver } = req.params;
  const { message } = req.body;

  const messageReq = messageSchema({
    user: username,
    receiver: receiver,
    message: message,
    date: new Date().toISOString(),
  });

  messageReq.save();

  res.json(messageReq);
});

module.exports = router;
