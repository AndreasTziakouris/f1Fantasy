const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const f1FantasyTeamEntrySchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
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
      type: Number,
      default: 0,
    },
    rankingInLeague: {
      type: Number,
      required: true,
    },
    createdAtGP: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("f1FantasyTeamEntry", f1FantasyTeamEntrySchema);
