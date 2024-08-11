const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const PORT = 3000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(console.log("connected with db"))
  .catch((err) => console.log(err));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
  console.log("hit /");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
