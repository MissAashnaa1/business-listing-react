const mongoose = require("mongoose");

const adminSettingsSchema = new mongoose.Schema(
  {
    settingKey: { type: String, required: true },
    settingValue: { type: Boolean, required: true },
  },
  { timestamps: true }
);

const SiteSettings = mongoose.model("SiteSettings", adminSettingsSchema);

module.exports = SiteSettings;
