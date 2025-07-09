const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const f1FantasyTeamSchema = new Schema(
  {
    userId: {
      required: true,
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    driverIds: [
      {
        required: true,
        type: Schema.Types.ObjectId,
        ref: "f1Driver",
      },
    ],
    teamIds: [
      {
        type: Schema.Types.ObjectId,
        ref: "f1Team",
        required: true,
      },
    ],
    remainingBudget: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("f1FantasyTeam", f1FantasyTeamSchema);
