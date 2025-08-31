const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.post('/register', (req, res) => {
  const {username, password} = req.body;
  res.json({requestData: {username, password}});
  

  res.json('test ok2');
});
//mongosh "mongodb+srv://cluster0.wi6zwwy.mongodb.net/" --apiVersion 1 --username basuaranya5_db_user --password WXIbCnlZldHTZqcu
app.listen(4000);