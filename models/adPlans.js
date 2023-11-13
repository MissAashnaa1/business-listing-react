const mongoose = require("mongoose");

const adPlansSchema = mongoose.Schema(
  {
    name: { type: String },
    durationDays: { type: String },
    price: { type: String },
  },
  { timestamps: true }
);

const AdPlans = mongoose.model("adPlans", adPlansSchema);

module.exports = AdPlans;
