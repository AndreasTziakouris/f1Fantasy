const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const f1FantasyLeagueSchema = new Schema(
  {
    leagueType: {
      type: String, //official, community, etc.
      required: true,
    },
    leagueName: {
      type: String,
      required: true,
    },
    leagueImageURL: {
      type: String,
      required: true,
    },
    rules: {
      // add other rules
      maxTeams: {
        type: Number,
        required: true,
      },
      roundsIncluded: [
        {
          raceId: {
            required: true,
            type: Schema.Types.ObjectId,
            ref: "f1RaceData",
          },
          roundNumber: {
            type: Number,
            required: true,
          },
        },
      ],
    },
    createdByRef: {
      //could be created by admin or user , configure accordingly
      required: true,
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    entryAmount: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("f1FantasyLeague", f1FantasyLeagueSchema);
