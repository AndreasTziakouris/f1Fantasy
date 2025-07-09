const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const f1DriverSchema = new Schema(
  {
    name: {
      required: true,
      type: String,
    },
    surname: {
      required: true,
      type: String,
    },
    abbreviation: {
      required: true,
      type: String,
    },
    teamId: {
      type: Schema.Types.ObjectId,
      ref: "f1Team",
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("f1Driver", f1DriverSchema);
