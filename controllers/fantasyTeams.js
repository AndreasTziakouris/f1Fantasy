const mongoose = require("mongoose");
const fantasyTeamsModel = require("../models/f1FantasyTeam.js");
const f1DriverModel = require("../models/f1Driver.js");
const f1TeamModel = require("../models/f1Team.js");

const populateFantasyTeams = async (userId, teamId) => {
  const filter = teamId ? { userId: userId, _id: teamId } : { userId: userId };
  const detailedFantasyTeams = await fantasyTeamsModel
    .find(filter)
    .populate({
      path: "f1Drivers.driverId",
    })
    .populate({
      path: "f1Teams.teamId",
    })
    .lean();
  return detailedFantasyTeams;
};

exports.getAllFantasyTeams = async (req, res, next) => {
  try {
    const userId = req.userId;
    const fantasyTeams = await populateFantasyTeams(userId, null);
    if (fantasyTeams.length === 0) {
      return res.status(200).json({ message: "No teams found", teams: [] });
    }
    res
      .status(200)
      .json({ message: "Teams fetching succesfull", teams: fantasyTeams });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.getFantasyTeam = async (req, res, next) => {
  try {
    const userId = req.userId;
    const fantasyTeamId = req.params.fantasyTeamId;
    const fantasyTeam = await populateFantasyTeams(userId, fantasyTeamId);
    if (!fantasyTeam[0]) {
      return res.status(404).json({ message: "Fantasy team not found" }); //should never happen
    }
    res.status(200).json({ message: "Fantasy Team Found!", team: fantasyTeam });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.updateFantasyTeam = async (req, res, next) => {
  try {
    const userId = req.userId;
    const fantasyTeamId = req.body.fantasyTeamId; //can be undefined
    let isNew = false;
    if (!fantasyTeamId) {
      isNew = true;
    }
    const filter = fantasyTeamId
      ? { _id: fantasyTeamId, userId: userId }
      : { _id: new mongoose.Types.ObjectId(), userId: userId }; //assign new objectId for team id if doesn't exist

    const update = {
      $set: {
        f1Drivers: req.body.f1Drivers,
        f1Teams: req.body.f1Teams,
        remainingBudget: req.body.remainingBudget,
        remainingTransfers: req.body.remainingTransfers,
        fantasyTeamName: req.body.fantasyTeamName,
      },
      $setOnInsert: {
        createdAtGP: parseInt(process.env.CURRENT_ROUND_NUMBER),
        totalPoints: 0,
        raceHistory: [],
        userId: userId,
      },
    };

    const options = {
      new: true,
      upsert: true,
      runValidators: true,
    };

    const updatedTeam = await fantasyTeamsModel.findOneAndUpdate(
      filter,
      update,
      options
    );
    if (isNew) {
      //simulate for new team
      //await pointsCalculationService.simulateTeamPoints(updatedTeam);
    }
    res.status(201).json(updatedTeam);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.getF1Drivers = async (req, res, next) => {
  try {
    const f1Drivers = await f1DriverModel.find(); //could use .select here to get only needed fields
    res.status(200).json(f1Drivers);
  } catch (err) {
    next(err);
  }
};

exports.getF1Teams = async (req, res, next) => {
  try {
    const f1Teams = await f1TeamModel.find(); //could use .select here to get only needed fields
    res.status(200).json(f1Teams);
  } catch (err) {
    next(err);
  }
};
