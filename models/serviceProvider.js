const mongoose = require("mongoose");

const serviceProviderSchema = new mongoose.Schema(
  {
    firstName: { type: String },
    lastName: { type: String },
    contact: { type: String, unique: true, maxLength: 10 },
    email: { type: String, unique: true },
    profilePic: { type: String, default: null },
    password: { type: String, select: false },

    address: {
      street: { type: String },
      city: { type: String },
      state: { type: String },
      zip: { type: String },
    },
    service: {
      category: { type: String },
      serviceName: { type: String },
      website: { type: String },
      about: { type: String },
    },
    isVerified: { type: Boolean, default: false },
    isBlocked: { type: Boolean, default: false },
    isOnline: { type: Boolean, default: false },
    isAvailable: { type: Boolean, default: false },
    isBusy: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const ServiceProvider = mongoose.model(
  "ServiceProvider",
  serviceProviderSchema
);

module.exports = ServiceProvider;
