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
    const fantasyLeagueId = req.body.fantasyLeagueId;
    const filter = fantasyLeagueId
      ? { _id: fantasyLeagueId }
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
        createdByRef: userId,
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
    res.status(200).json({ message: "League and related entries deleted" });
  } catch (err) {
    next(err);
  }
};
