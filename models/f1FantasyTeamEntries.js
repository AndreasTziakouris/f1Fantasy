const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const f1FantasyTeamEntrySchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    fantasyTeamId: {
      type: Schema.Types.ObjectId,
      ref: "f1FantasyTeam",
      required: true,
    },
    leagueId: {
      type: Schema.Types.ObjectId,
      ref: "f1FantasyLeague",
      required: true,
    },
    totalPoints: {
      //maybe remove
      type: Number,
      default: 0,
    },
    joinedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "f1FantasyTeamEntry",
  f1FantasyTeamEntriesSchema
);
