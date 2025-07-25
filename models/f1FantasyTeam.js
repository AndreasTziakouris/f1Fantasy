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
    createdAtGP: {
      type: Number,
      required: true,
    },
    f1Drivers: [
      {
        driverId: {
          required: true,
          type: Schema.Types.ObjectId,
          ref: "f1Driver",
        },
        driverSurname: {
          type: String,
          required: true,
        },
        doublePoints: {
          required: true,
          type: Boolean,
        },
      },
    ],
    f1Teams: [
      {
        teamId: {
          type: Schema.Types.ObjectId,
          ref: "f1Team",
          required: true,
        },
        teamName: {
          type: String,
          required: true,
        },
      },
    ],
    raceHistory: {
      //possibly keep a mini snapshot of the team that was registered for that grand prix
      type: [
        {
          raceId: {
            type: Schema.Types.ObjectId,
            ref: "f1RaceData",
          },
          roundNumber: {
            type: Number,
            required: true,
          },
          pointsEarned: {
            type: Number,
            required: true,
          },
        },
      ],
      default: [],
    },
    totalPoints: {
      type: Number,
      required: true,
      default: 0,
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
