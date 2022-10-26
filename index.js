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
const getFriends = require("./routes/getFriends");
const getLastMessageDate = require("./routes/getLastMessageDate");
const sendFriendRequest = require("./routes/sendFriendRequest");
const getFriendRequestList = require("./routes/getFriendRequestList");
const removeFriendRequest = require("./routes/removeFriendRequest");

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

//USERS
app.use("/api", addUser); //POST /adduser/<username>/<password> => user: String, password: String
app.use("/api", checkUser); //GET /checkuser/<username>/<password> => status: Boolean, user: String, password: String
//MESSAGES
app.use("/api", postMessage); //POST /post/<username>/<receiver> & body: {message: <message>} => user: String, receiver: String, message: String, date: new Date()
app.use("/api", getConversation); //GET /get/<username>/<receiver> => messages of <username> and <receiver>
//FRIENDS
app.use("/api", addFriend); //POST /friends/add/<username>/<friend> => status: String, user: String, friends: Array
app.use("/api", removeFriend); //GET /friends/remove/<username>/<friend> => status: String, user: String, friends: Array
app.use("/api", getFriends); //GET /friends/remove/<username>/<friend> => status: String, user: String, friends: Array
app.use("/api", getLastMessageDate); //GET /friends/remove/<username>/<friend> => status: String, user: String, friends: Array
app.use("/api", sendFriendRequest); //GET /friends/remove/<username>/<friend> => status: String, user: String, friends: Array
app.use("/api", getFriendRequestList); //GET /friends/remove/<username>/<friend> => status: String, user: String, friends: Array
app.use("/api", removeFriendRequest); //GET /friends/remove/<username>/<friend> => status: String, user: String, friends: Array

//server PORT
app.listen(
  process.env.PORT || PORT,
  console.log("Server running in " + process.env.PORT || PORT)
);
