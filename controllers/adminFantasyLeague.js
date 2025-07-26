const mongoose = require("mongoose");

const fantasyLeagueModel = require("../models/f1FantasyLeague");
const fantasyTeamEntriesModel = require("../models/f1FantasyTeamEntries");

exports.updateFantasyLeague = async (req, res, next) => {
  try {
    const userId = req.userId;
    const { leagueType, leagueName } = req.body;
    const leagueImageURL = req.body.leagueImageURL;
    const maxTeams = req.body.maxTeams;
    const roundsIncluded = req.body.roundsIncluded; //array
    const leagueId = req.body.leagueId; //might be undefined
    const isNew = leagueId ? false : true;
    if (isNew) {
      //console.log("is new");
    } else {
      //possibly block someone that is not authorized to edit this league
      //console.log("is not new");
    }
    const filter = leagueId
      ? { _id: leagueId }
      : { _id: new mongoose.Types.ObjectId() };
    const update = {
      $set: {
        leagueType: leagueType,
        leagueName: leagueName,
        leagueImageURL: leagueImageURL,
        rules: {
          maxTeams: maxTeams,
          roundsIncluded: roundsIncluded,
        },

        //entry amount is default at 0, or if already exists will stay the same
      },
      $setOnInsert: {
        userId: userId,
      },
    };
    const options = {
      new: true,
      upsert: true,
      runValidators: true,
    };
    const result = await fantasyLeagueModel.findOneAndUpdate(
      filter,
      update,
      options
    );
    res.status(201).json({ result: result });
  } catch (err) {
    next(err);
  }
};

exports.deleteFantasyLeague = async (req, res, next) => {
  try {
    const leagueId = req.body.leagueId;
    const deletedLeague = await fantasyLeagueModel.findByIdAndDelete(leagueId);
    await fantasyTeamEntriesModel.deleteMany({ leagueId });
    res
      .status(200)
      .json({
        message: "League and related entries deleted",
        deletedLeague: deletedLeague,
      });
  } catch (err) {
    next(err);
  }
};
