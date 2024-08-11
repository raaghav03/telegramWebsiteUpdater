const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const TelegramBot = require("node-telegram-bot-api");
dotenv.config();
const token = process.env.TELEGRAM_API;
const app = express();
const PORT = 3000;
app.use(express.json());

const bot = new TelegramBot(token, { polling: true });

mongoose
  .connect(process.env.MONGO_URI)
  .then(console.log("connected with db"))
  .catch((err) => console.log(err));

const dataSchema = new mongoose.Schema({
  entry: { type: String, required: true },
  timestamp: { type: String, required: true }, // Store the formatted date/time as a string
});

const Data = mongoose.model("dataScheme", dataSchema);

bot.on("message", async (msg) => {
  console.log("Chat ID:", msg.chat.id);
  console.log("Message text:", msg.text);

  const epochTime = msg.date;
  const date = new Date(epochTime * 1000);

  const options = {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };

  const formattedDate = date.toLocaleString("en-US", options);
  console.log("Formatted Date:", formattedDate);

  try {
    // Save both message text and formatted date/time
    const data = new Data({ entry: msg.text, timestamp: formattedDate });
    await data
      .save()
      .then(() => console.log("Added to DB"))
      .catch((err) => console.log("Error saving to DB:", err));

    await bot.sendMessage(
      msg.chat.id,
      `${msg.text} is added to the database at the timestamp ${formattedDate}`
    );
    console.log("Message sent successfully");
  } catch (error) {
    console.error("Error processing message:", error);
  }
});

app.get("/", (req, res) => {
  res.send("Hello World!");
  console.log("hit /");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
