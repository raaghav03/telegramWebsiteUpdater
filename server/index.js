const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const TelegramBot = require("node-telegram-bot-api");
dotenv.config();
const token = process.env.TELEGRAM_API;
const app = express();
const PORT = 3000;

const bot = new TelegramBot(token, { polling: true });

mongoose
  .connect(process.env.MONGO_URI)
  .then(console.log("connected with db"))
  .catch((err) => console.log(err));
bot.on("message", (msg) => {
  console.log(msg.text);
});
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
  console.log("hit /");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
