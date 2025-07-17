const mongoose = require("mongoose");

const f1DriverModel = require("../models/f1Driver");
const f1TeamModel = require("../models/f1Team");
const f1RaceDataModel = require("../models/f1RaceData");

exports.insertf1DriverData = async (req, res, next) => {
  try {
    const {
      name,
      surname,
      abbreviation,
      f1TeamId,
      description,
      imageUrl,
      driverCost,
    } = req.body;
    if (
      !name ||
      !surname ||
      !abbreviation ||
      !f1TeamId ||
      !imageUrl ||
      !driverCost
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const driver = new f1DriverModel({
      name,
      surname,
      abbreviation,
      f1TeamId,
      description,
      imageUrl,
      driverCost,
    });
    await driver.save();
    res
      .status(201)
      .json({ message: "F1 driver data saved", driverId: driver._id });
  } catch (err) {
    next(err);
  }
};

exports.insertf1TeamData = async (req, res, next) => {
  try {
    const { name, fullName, f1TeamPrincipal, description, imageUrl, teamCost } =
      req.body;
    if (!name || !fullName || !f1TeamPrincipal || !imageUrl || !teamCost) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const team = new f1TeamModel({
      name,
      fullName,
      f1TeamPrincipal,
      description,
      imageUrl,
      teamCost,
    });
    await team.save();
    res.status(201).json({ message: "F1 team data saved", teamId: team._id });
  } catch (err) {
    next(err);
  }
};

exports.insertf1RaceResults = async (req, res, next) => {
  try {
    const {
      roundNumber,
      circuitName,
      f1DriversPerformance,
      f1TeamPerformance,
      safetyCars,
    } = req.body;
    if (
      !Array.isArray(f1DriversPerformance) ||
      !Array.isArray(f1TeamPerformance)
    ) {
      return res.status(400).json({ message: "Invalid input format" });
    }

    const race = new f1RaceDataModel({
      roundNumber,
      circuitName,
      f1DriversPerformance,
      f1TeamPerformance,
      safetyCars,
    });

    await race.save();
    res.status(201).json({ message: "Race results saved", raceId: race._id });
  } catch (err) {
    console.error(err);
    next(err);
  }
};
