const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv").config();

const authRoutes = require("./routes/auth.js");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/auth", authRoutes);
//add /admin to admin fantasyleague routes
app.use((error, req, res, next) => {
  //error middleware
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({
    message: message,
    data: data,
  });
});

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(3000);
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });
