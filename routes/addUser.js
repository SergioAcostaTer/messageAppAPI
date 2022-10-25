const express = require("express");
const userSchema = require("../models/userSchema");

const router = express.Router();

router.post("/adduser/:username/:password", (req, res) => {
  const { username, password } = req.params;

  const user = userSchema({
    status: true,
    user: username,
    password: password,
  });

  user.save();

  res.json(user);
});

module.exports = router;
