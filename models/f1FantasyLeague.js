const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const f1FantasyLeagueSchema = new Schema(
  {
    rules: {
      // add other rules
      maxTeams: {
        type: Number,
        required: true,
      },
      roundsIncluded: [
        {
          roundId: {
            required: true,
            type: Schema.Types.ObjectId,
            ref: "f1RaceData",
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
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("f1FantasyLeague", f1FantasyLeagueSchema);
