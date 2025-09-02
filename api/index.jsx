const express = require("express");
const app = express();
app.use(express.json());
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/User");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require("cookie-parser");

const salt = bcrypt.genSaltSync(10);
const secret = 'asdasdasdasdasd';

app.use(cors({credentials:true, origin:'http://localhost:5173'}));
app.use(express.json());
app.use(cookieParser());

mongoose.connect(
  "mongodb+srv://basuaranya5_db_user:WXIbCnlZldHTZqcu@cluster0.wi6zwwy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
);

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  // Create a new user in the database
  try {
    const userDoc = await User.create({ 
      username,
      password: bcrypt.hashSync(password, salt),});
    res.json(userDoc);
  } catch (e) {
    return res.status(400).json(e);
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  
  const userDoc = await User.findOne({ username });
  if (!userDoc) {
    return res.status(404).json({ message: "User not found" });
  }

  const passOk = await bcrypt.compare(password, userDoc.password);
  if (!passOk) {
    return res.status(400).json({ message: "Wrong credentials" });
  }

  jwt.sign({ username, id: userDoc._id }, secret, {}, (err, token) => {
    if (err) throw err;
    res.cookie("token", token).json({
      id: userDoc._id,
      username, 
    });
  });
});

app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, secret, {}, (err, info) => {
      if (err) throw err;
      res.json(info);
    });
  } else {
    res.status(401).json("No token");
  }
  res.json(req.cookies);
});

app.post("/logout", (req, res) => {
  res.cookie("token", "").json({
    id: userDoc._id,
    username
  });
});


app.listen(4000, () => {
  console.log("Server running on http://localhost:4000");
});

