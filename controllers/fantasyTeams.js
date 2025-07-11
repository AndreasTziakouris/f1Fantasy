const mongoose = require("mongoose");
const fantasyTeamsModel = require("../models/f1FantasyTeam.js");
const f1DriverModel = require("../models/f1Driver.js");
const f1TeamModel = require("../models/f1Team.js");

exports.getAllFantasyTeams = async (req, res, next) => {
  try {
    const userId = req.userId;

    const fantasyTeams = await fantasyTeamsModel.find({ userId: userId });
    if (fantasyTeams.length === 0) {
      return res.status(200).json({ message: "No teams found", teams: [] });
    }
    res.status(200).json(fantasyTeams);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.getFantasyTeam = async (req, res, next) => {
  try {
    const userId = req.userId;
    const fantasyTeamId = req.params.fantasyTeamId;

    const fantasyTeam = await fantasyTeamsModel.findOne({
      //probably gonna have to use populate to return images and stuff
      userId: userId,
      _id: fantasyTeamId,
    });
    if (!fantasyTeam) {
      return res.status(404).json({ message: "Fantasy team not found" }); //should never happen
    }
    res.status(200).json(fantasyTeam);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.updateFantasyTeam = async (req, res, next) => {
  try {
    const userId = req.userId;
    const fantasyTeamId = req.body.fantasyTeamId; //can be undefined

    const filter = fantasyTeamId
      ? { _id: fantasyTeamId, userId: userId }
      : { _id: new mongoose.Types.ObjectId(), userId: userId }; //assign new objectId for team id if doesn't exist

    const update = {
      $set: {
        f1Drivers: req.body.f1Drivers,
        f1Teams: req.body.f1Teams,
        remainingBudget: req.body.remainingBudget,
        remainingTransfers: req.body.remainingTransfers,
        fantasyTeamName: req.body.teamName,
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
    ); //could have also just found and saved here

    res.status(200).json(updatedTeam);
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
