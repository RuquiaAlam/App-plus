import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Connected to db!");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Hello");
});
