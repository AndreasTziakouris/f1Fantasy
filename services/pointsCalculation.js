const mongoose = require("mongoose");

const dotenv = require("dotenv").config();

const fantasyTeamModel = require("../models/f1FantasyTeam");
const fantasyLeagueModel = require("../models/f1FantasyLeague");
const raceDataModel = require("../models/f1RaceData");
const fantasyTeamEntriesModel = require("../models/f1FantasyTeamEntries");

exports.simulateTeamPoints = async (team) => {
  //gets called upon team creation, to simulate all grand prix until that point
  for (let i = 1; i <= parseInt(process.env.LAST_ROUND_COMPLETED); i++) {
    await calculateRoundPoints(team, i);
  }
};
exports.check = () => {
  try {
  } catch (err) {
    next(err);
  }
};
exports.calculateRoundPoints = async (team, roundNumber) => {
  //gets called from all our different endpoints (example team initialization, after-race leaderboard updates, etc)
  //returns an integer of points for this round, and updates race history in fantasy teams model
  try {
    const raceData = await raceDataModel.findOne({ roundNumber: roundNumber });
    let pointsScored = 0;
    for (let driver of team.f1Drivers) {
      const performance = raceData.f1DriversPerformance.find((p) => {
        return p.driverId.toString() === driver.driverId.toString();
      });
      if (!performance) {
        const error = new Error("Something wrong with data");
        throw error;
      }
      let driverPoints = performance.points;
      if (driver.doublePoints) {
        driverPoints *= 2;
      }
      pointsScored += driverPoints;
    }

    for (let f1team of team.f1Teams) {
      const performance = raceData.f1TeamPerformance.find((p) => {
        return p.teamId.toString() === f1team.teamId.toString();
      });
      if (!performance) {
        const error = new Error("Something wrong with data");
        throw error;
      }
      pointsScored += performance.overallPoints;
    }

    //check if already exists and configure accordingly. if it does, we don't want to override,
    //because we want to keep the data of the fantasy team that was set at that time

    const alreadyExists = team.raceHistory.some((r) => {
      return r.roundNumber === roundNumber;
    });
    if (!alreadyExists) {
      //shouldn't be a thing
      team.raceHistory.push({
        raceId: raceData._id,
        roundNumber: raceData.roundNumber,
        pointsEarned: pointsScored,
      });
      team.totalPoints += pointsScored;
      await team.save();
    }
  } catch (err) {
    next(err);
  }
  //return pointsScored;    optionally return this
};

exports.updateAllFantasyTeamForRound = async (req, res, next) => {
  const roundNumber = req.body.roundNumber;
  //updates all fantasy teams for that selected round, according to their current structure
  const allTeams = await fantasyTeamModel.find();
  for (let team of allTeams) {
    await this.calculateRoundPoints(team, roundNumber);
  }
  res.status(200).json({ message: "Teams updated succesfully" });
};

exports.updateAllLeagueEntriesForRound = async (req, res, next) => {
  try {
    const roundNumber = req.body.roundNumber;
    const affectedLeagues = await fantasyLeagueModel.find({
      "rules.roundsIncluded.roundNumber": roundNumber,
    });
    const leagueIds = affectedLeagues.map((league) => {
      return league._id;
    });
    const entries = fantasyTeamEntriesModel
      .find({ leagueId: { $in: leagueIds } })
      .populate("fantasyTeamId", "createdAtGP raceHistory");

    for (let entry of entries) {
      if (roundNumber < entry.fantasyTeamId.createdAtGP) continue;
      const roundRecord = entry.fantasyTeamId.raceHistory.find(
        (r) => r.roundNumber === roundNumber
      );
      const pointsLastRound = roundRecord.pointsEarned;
      entry.totalPoints += pointsLastRound;
      await entry.save();
      res.status(200).json({ message: "Team entries updated succesfully" });
    }
  } catch (err) {
    next(err);
  }
};
