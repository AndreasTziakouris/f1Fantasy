const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const f1FantasyTeamSchema = new Schema(
  {
    userId: {
      required: true,
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    fantasyTeamName: {
      type: String,
      required: true,
    },
    f1Drivers: [
      {
        driverId: {
          required: true,
          type: Schema.Types.ObjectId,
          ref: "f1Driver",
        },
        doublePoints: {
          required: true,
          type: Boolean,
        },
      },
    ],
    f1Teams: [
      {
        teamid: {
          type: Schema.Types.ObjectId,
          ref: "f1Team",
          required: true,
        },
      },
    ],
    raceHistory: {
      type: [
        {
          raceId: {
            type: Schema.Types.ObjectId,
            ref: "f1RaceData",
          },
          roundNumber: Number,
          pointsEarned: Number,
        },
      ],
      default: [],
    },
    remainingBudget: {
      type: Number,
      required: true,
    },
    remainingTransfers: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("f1FantasyTeam", f1FantasyTeamSchema);
