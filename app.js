const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv").config();
const path = require("path");
const authRoutes = require("./routes/auth.js");
const fantasyLeagueRoutes = require("./routes/fantasyLeagues.js");
const fantasyTeamRoutes = require("./routes/fantasyTeams.js");
const adminFantasyLeagueRoutes = require("./routes/adminFantasyLeague.js");
const adminPointsCalculationRoutes = require("./routes/adminPointsCalculation.js");
const staticDataInsertionRoutes = require("./routes/staticDataInsertion.js");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use("/images", express.static(path.join(__dirname, "public/images")));
console.log(path.join(__dirname, "public/images/drivers/driverLeclerc.jpg"));

app.use("/auth", authRoutes);
app.use("/fantasyTeams", fantasyTeamRoutes);
app.use("/fantasyLeagues", fantasyLeagueRoutes);
app.use("/admin/fantasyLeagues", adminFantasyLeagueRoutes);
app.use("/admin", adminPointsCalculationRoutes);
app.use("/admin", staticDataInsertionRoutes);

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
