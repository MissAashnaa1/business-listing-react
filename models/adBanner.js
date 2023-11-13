const mongoose = require("mongoose");

const adBannerSchema = new mongoose.Schema(
  {
    label: { type: String, default: null },
    alt: { type: String, requird: true },
    url: { type: String, required: true },
    active: { type: Boolean, default: true },
    startDate: { type: Date, default: Date.now },
    endDate: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

const AdBanner = mongoose.model("AdBanner", adBannerSchema);

module.exports = AdBanner;
