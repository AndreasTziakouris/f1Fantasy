const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const f1TeamSchema = new Schema(
  {
    name: {
      required: true,
      type: String,
    },
    fullName: {
      //with Sponsors
      required: true,
      type: String,
    },
    f1TeamPrincipal: {
      //add more accordingly
      name: {
        type: String,
        required: true,
      },
      nationality: {
        type: String,
      },
      experienceYears: {
        type: Number,
      },
    },
    description: {
      type: String,
      required: false,
    },
    imageUrl: {
      required: true,
      type: String,
    },
    teamCost: {
      required: true,
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("f1Team", f1TeamSchema);
