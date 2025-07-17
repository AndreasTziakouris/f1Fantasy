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
        finishPosition: {
          type: Number,
          required: true,
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
          type: Boolean, //maybe switch to boolean to avoid unnecessary checks
          required: true,
        },
        overallPoints: {
          type: Number,
          required: true,
        },
      },
    ],
    safetyCars: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("f1RaceData", f1RaceData);
