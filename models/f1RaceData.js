const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const f1RaceData = new Schema(
  {
    roundNumber: {
      type: Number,
      required: true,
    },
    circuitName: {
      type: String,
      required: true,
    },
    f1DriversPerformance: [
      {
        driverId: {
          required: true,
          type: Schema.Types.ObjectId,
          ref: "f1Driver",
        },
        f1DriverSurname: {
          required: true,
          type: String,
        },
        finishPosition: {
          type: Number,
          required: true,
        },
        sprintFinishPosition: {
          type: Number,
          required: true,
          default: 0,
        },
        qualiPosition: {
          type: Number,
          required: true,
        },
        fastestLap: {
          type: Boolean,
          required: true,
        },
        points: {
          type: Number,
          required: true,
        },
        placesFromStartingPosition: {
          type: Number,
          required: true,
        },
      },
    ],
    f1TeamPerformance: [
      {
        teamId: {
          required: true,
          type: Schema.Types.ObjectId,
          ref: "f1Team",
        },
        teamName: {
          required: true,
          type: String,
        },
        drivers: [
          {
            driverId: {
              required: true,
              type: Schema.Types.ObjectId,
              ref: "f1Driver",
            },
            pointsScored: {
              type: Number,
              required: true,
            },
          },
        ],
        fastestPitStop: {
          type: Boolean,
          required: true,
        },
        overallPoints: {
          type: Number,
          required: true,
        },
      },
    ],
    safetyCars: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("f1RaceData", f1RaceData);
