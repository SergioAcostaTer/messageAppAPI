//packages
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

//routes
const addUser = require("./routes/addUser");
const checkUser = require("./routes/checkUser");
const postMessage = require("./routes/postMessage");
const getConversation = require("./routes/getConversation");
const addFriend = require("./routes/addFriend");
const removeFriend = require("./routes/removeFriend");

//dotenv config
require("dotenv").config();

const app = express();
const PORT = 666;

app.use(cors());
app.use(express.json());

//connection to database
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MONGODB"));

//routes
app.get("/api", (req, res) => {
  res.send("Welcome to MessagaApp");
});
app.use("/api", addUser); // /adduser/<username>/<password> => user: String, password: String
app.use("/api", checkUser); // /checkuser/<username>/<password> => status: Boolean, user: String, password: String
app.use("/api", postMessage); // /post/<username>/<receiver> & body: {message: <message>} => user: String, receiver: String, message: String, date: new Date()
app.use("/api", getConversation); // /get/<username>/<receiver> => messages of <username> and <receiver>
app.use("/api", addFriend); // /friends/add/<username>/<friend> => status: String, user: String, friends: Array
app.use("/api", removeFriend); // /friends/remove/<username>/<friend> => status: String, user: String, friends: Array

//server PORT
app.listen(
  process.env.PORT || PORT,
  console.log("Server running in " + process.env.PORT || PORT)
);
