const mongoose = require("mongoose");

const appliedAdsSchema = mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    adLabel: { type: String },
    adURL: { type: String },
    adPlanId: { type: mongoose.Schema.Types.ObjectId, ref: "adPlans" },
    isApproved: { type: Boolean, default: false },
    isPaid: { type: Boolean, default: false },
    isActive: { type: Boolean, default: false },
    payment: {
      razorpay_payment_id: { type: String, default: "" },
      razorpay_order_id: { type: String, default: "" },
      razorpay_signature: { type: String, default: "" },
    },
  },
  { timeStamps: true }
);

const AppliedAds = mongoose.model("appliedAds", appliedAdsSchema);

module.exports = AppliedAds;
