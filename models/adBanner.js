const mongoose = require("mongoose");

const adBannerSchema = new mongoose.Schema({
  label: { type: String, default: null },
  alt: { type: String, requird: true },
  url: { type: String, required: true },
  // active: { type: Boolean, default: false },
  // startDate: { type: Date, default: Date.now },
  // endDate: { type: Date, default: Date.now },
  // createdAt: { type: Date, default: Date.now },
  // updatedAt: { type: Date, default: Date.now },
});

const AdBanner = mongoose.model("AdBanner", adBannerSchema);

module.exports = AdBanner;
