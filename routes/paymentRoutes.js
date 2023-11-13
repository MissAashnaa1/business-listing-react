const express = require("express");
const {
  checkout,
  paymentVerification,
  testAd,
} = require("../controllers/paymentController");
const router = express.Router();

router.get("/get-key", (req, res) => {
  res.json({ key: process.env.RAZORPAY_KEY_ID });
});
router.post("/checkout", checkout);
router.post("/payment-verification/:adId", paymentVerification);
router.get("/test/:adId", testAd);

module.exports = router;
