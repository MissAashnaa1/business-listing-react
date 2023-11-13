const AdBanner = require("../models/adBanner");
const AppliedAds = require("../models/appliedAds");

const getAdBannersBL = async (req, res) => {
  console.log("here");
  try {
    const adList = await AdBanner.find({ active: true });
    const adlistApplied = await AppliedAds.find({ isActive: true });

    res
      .status(200)
      .json({ success: true, adList: adList, adlistApplied: adlistApplied });
  } catch (error) {
    console.log(error, "error in getAdBanners");
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

const createAdBanner = async (req, res) => {
  const { label, url } = req.body;

  if (!url || !label) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  try {
    const newAdBanner = await AdBanner.create({ label, url, alt: label });
    res.status(201).json({ success: true, newAdBanner });
  } catch (error) {
    console.log(error, "error in createAdBanner");
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

const updateAdImgStatus = async (req, res) => {
  const { id, status } = req.body;

  if (id === undefined || status === undefined) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  try {
    const updatedAd = await AdBanner.findByIdAndUpdate(id, { active: status });

    const adList = await AdBanner.find({ active: true });
    const adlistApplied = await AppliedAds.find({ isActive: true });

    const io = req.app.get("io");
    io.emit("updateAdImgStatusToClient", {
      adList: adList,
      adlistApplied: adlistApplied,
    });

    res.status(201).json({ success: true, updatedAd });
  } catch (error) {
    console.log(error, "error in updateAdImgStatus");
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

module.exports = {
  getAdBannersBL,
  createAdBanner,
  updateAdImgStatus,
};
