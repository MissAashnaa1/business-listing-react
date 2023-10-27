const mongoose = require("mongoose");

const querySchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true, uppercase: true },
    lastName: { type: String, required: true, trim: true, uppercase: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    message: { type: String, required: true, trim: true, max: 300 },
    date: { type: String, required: true, trim: true },
    time: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

const Query = mongoose.model("Query", querySchema);

module.exports = Query;
