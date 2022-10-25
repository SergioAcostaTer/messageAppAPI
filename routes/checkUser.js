const express = require("express");
const userSchema = require("../models/userSchema");

const router = express.Router();

router.get("/checkuser/:username/:password", async (req, res) => {
  const { username, password } = req.params;

  const match = await userSchema
    .find({ user: username, password: password })
    .select("user password status -_id");

  if (match[0]) {
    res.json(match);
  }
  if (!match[0]) {
    res.json({ status: false });
  }
});

module.exports = router;
