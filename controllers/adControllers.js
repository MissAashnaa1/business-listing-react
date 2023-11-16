const AdBanner = require("../models/adBanner");
const AppliedAds = require("../models/appliedAds");
const { default: ErrorHandler } = require("../middlewares/error");

const getAdBannersBL = async (req, res, next) => {
  const adList = await AdBanner.find({ active: true });
  const adlistApplied = await AppliedAds.find({ isActive: true });
  res
    .status(200)
    .json({ success: true, adList: adList, adlistApplied: adlistApplied });
};

const createAdBanner = async (req, res, next) => {
  const { label, url } = req.body;

  if (!url || !label)
    return next(new ErrorHandler("Please enter all fields", 400));

  const newAdBanner = await AdBanner.create({ label, url, alt: label });
  res.status(201).json({ success: true, newAdBanner });
};

const updateAdImgStatus = async (req, res, next) => {
  const { id, status } = req.body;

  if (id === undefined || status === undefined)
    return next(new ErrorHandler("Please enter all fields", 400));

  const updatedAd = await AdBanner.findByIdAndUpdate(id, { active: status });

  const adList = await AdBanner.find({ active: true });
  const adlistApplied = await AppliedAds.find({ isActive: true });

  const io = req.app.get("io");
  io.emit("updateAdImgStatusToClient", {
    adList: adList,
    adlistApplied: adlistApplied,
  });

  res.status(201).json({ success: true, updatedAd });
};

module.exports = {
  getAdBannersBL,
  createAdBanner,
  updateAdImgStatus,
};
