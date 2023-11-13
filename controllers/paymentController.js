const Razorpay = require("razorpay");
const crypto = require("crypto");
const AppliedAds = require("../models/appliedAds");
const schedule = require("node-schedule");

const checkout = async (req, res) => {
  try {
    const options = {
      amount: Number(req.body.amount) * 100,
      currency: "INR",
    };

    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const order = await instance.orders.create(options);

    res.json({ success: true, order });
  } catch (error) {
    console.log(error, "< error in checkout");
    res.status(500).json({ success: false, msg: "Server error", error });
  }
};

const paymentVerification = async (req, res) => {
  try {
    const { adId } = req.params;
    console.log(req.body, "< req.body");
    console.log(req.params, "< req.params");

    console.log(adId, "adId");
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    const ad = await AppliedAds.findByIdAndUpdate(adId, {
      isPaid: true,
      razorpay_payment_id: req.body.razorpay_payment_id,
      isActive: true,
    }).populate("adPlanId");

    console.log(ad, "<< ad");

    const date = new Date();
    date.setHours(date.getHours() + ad.adPlanId.durationDays * 24);

    const job = schedule.scheduleJob(date, async () => {
      const ad = await AppliedAds.findByIdAndUpdate(adId, {
        isPaid: true,
        razorpay_payment_id: req.body.razorpay_payment_id,
        isActive: false,
      });
    });

    return res.end("Payment verified");

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (!isAuthentic)
      return res
        .status(400)
        .json({ success: false, msg: "Payment verification failed" });
    else {
      const ad = await AppliedAds.findByIdAndUpdate(adId, {
        isPaid: true,
      });

      res.json({ success: true, msg: "Payment verified", ad });
    }
  } catch (error) {
    console.log(error, "< error in paymentVerification");
    res.status(500).json({ success: false, msg: "Server error", error });
  }
};

const testAd = async (req, res) => {
  const { adId } = req.params;
  try {
    const ad = await AppliedAds.findByIdAndUpdate(adId, {
      isPaid: true,
      razorpay_payment_id: req.body.razorpay_payment_id,
      isActive: true,
    }).populate("adPlanId");

    console.log(ad.adPlanId.durationDays, "<< ad");

    const date = new Date();
    date.setHours(date.getHours() + ad.adPlanId.durationDays * 24);

    const job = schedule.scheduleJob(date, async () => {
      const ad = await AppliedAds.findByIdAndUpdate(adId, {
        isPaid: true,
        razorpay_payment_id: req.body.razorpay_payment_id,
        isActive: false,
      });
    });
  } catch (error) {
    console.log(error, "<err");
  }
};

module.exports = {
  checkout,
  paymentVerification,
  testAd,
};
