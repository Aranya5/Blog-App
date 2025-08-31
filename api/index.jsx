const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/User");
const app = express();
const bcrypt = require('bcryptjs');

const salt = bcrypt.genSaltSync(10);
app.use(cors());
app.use(express.json());

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

app.listen(4000, () => {
  console.log("Server running on http://localhost:4000");
});
