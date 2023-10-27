const AdBanner = require("../models/adBanner");

const getAdBanners = async (req, res) => {
  try {
    const adList = await AdBanner.find();
    res.status(200).json({ success: true, adList });
  } catch (error) {
    console.log(error, "error in getAdBanners");
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

const createAdBanner = async (req, res) => {
  const { label, url, alt } = req.body;

  if (!url || !alt) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  try {
    const newAdBanner = await AdBanner.create({ label, url, alt });
    res.status(201).json({ success: true, newAdBanner });
  } catch (error) {
    console.log(error, "error in createAdBanner");
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

module.exports = {
  getAdBanners,
  createAdBanner,
};
