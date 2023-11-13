const Admin = require("../models/admin");
const bcrypt = require("bcrypt");
const { sendAdminCookies } = require("../utils/features");
const SiteSettings = require("../models/siteSettings");
const QueryMsg = require("../models/query");
const todayDate = require("../utils/todayDate");
const AdBanner = require("../models/adBanner");
const AdPlans = require("../models/adPlans");
const AppliedAds = require("../models/appliedAds");
const User = require("../models/user");

const loginAdmin = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .json({ success: false, msg: "Please provide username and password" });
  }

  try {
    console.log(username, password);
    const admin = await Admin.findOne({ username }).select("+password");
    if (!admin) {
      return res
        .status(404)
        .json({ success: false, msg: "Admin does not exist." });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res
        .status(404)
        .json({ success: false, msg: "Invalid credentials" });
    }
    sendAdminCookies(res, admin, "Admin logged in successfully", 200);
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, msg: "Server error", err });
  }
};

const createProfile = async (req, res) => {
  const { username, password, picURL, role } = req.body;
  if (!username || !password || !role) {
    return res.status(400).json({
      success: false,
      msg: "Please provide username, password and role",
    });
  }

  const admin = await Admin.findOne({ username });
  if (admin) {
    return res.status(400).json({
      success: false,
      msg: "Admin already exists",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const admin = await Admin.create({
      username,
      password: hashedPassword,
      picURL,
      role,
    });
    sendAdminCookies(res, admin, "Admin created successfully!", 201);
  } catch (err) {
    res.status(500).json({ success: false, msg: "Server error" });
  }
};

const logout = async (req, res) => {
  res.cookie("token", "none", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ success: true, msg: "Logged out" });
};

const getAdmin = async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin._id).select("-password");
    res.status(200).json({ success: true, admin });
  } catch (err) {
    res.status(500).json({ success: false, msg: "Server error" });
  }
};

const getAdminProfile = async (req, res) => {
  res.status(200).json({ success: true, admin: req.admin });
};

const getAdmins = async (req, res) => {
  try {
    const admins = await Admin.find({}).select("-password");
    res.status(200).json({ success: true, admins });
  } catch (err) {
    res.status(500).json({ success: false, msg: "Server error" });
  }
};

const getAdminById = async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id).select("-password");
    res.status(200).json({ success: true, admin });
  } catch (err) {
    res.status(500).json({ success: false, msg: "Server error" });
  }
};

const updateSiteSettings = async (req, res) => {
  const { settingKey, settingValue } = req.body;
  if (settingKey === undefined || settingValue === undefined) {
    return res.status(400).json({
      success: false,
      msg: "Please provide settings",
    });
  }
  try {
    const updatedSettings = await SiteSettings.findOneAndUpdate(
      { settingKey: settingKey },
      { settingValue: settingValue },
      { new: true, upsert: true }
    );

    res
      .status(200)
      .json({ success: true, msg: "Settings updated", updatedSettings });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, msg: "Server error", error: err });
  }
};

const getMessages = async (req, res) => {
  try {
    const messages = await QueryMsg.find({}).sort({
      createdAt: -1,
    });
    res.status(200).json({ success: true, messages });
  } catch (err) {
    res.status(500).json({ success: false, msg: "Server error" });
  }
};

const getAdBannersAdmin = async (req, res) => {
  try {
    const adBanners = await AdBanner.find({}).sort({ createdAt: -1 });
    res.status(200).json({ success: true, adBanners });
  } catch (err) {
    res.status(500).json({ success: false, msg: "Server error" });
  }
};

const getAdPlans = async (req, res) => {
  try {
    const plans = await AdPlans.find();
    res.json({ success: true, plans: plans });
  } catch (error) {
    res.status(500).json({ msg: "Interval server error", error: error });
  }
};

const createAdPlans = async (req, res) => {
  const { name, price, durationDays } = req.body;
  if (!name || !price || !durationDays) {
    return res
      .status(400)
      .json({ success: false, msg: "Please enter all fields" });
  }
  try {
    const newPlan = await AdPlans.create({ name, price, durationDays });
    res.status(201).json({ success: true, newPlan });
  } catch (error) {
    console.log(error, "error in createAdPlans");
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

const deleteAdPlan = async (req, res) => {
  const { id } = req.params;
  console.log(req.params, "params");
  if (!id) {
    return res.status(400).json({ success: false, msg: "Please enter id" });
  }
  try {
    const deletedPlan = await AdPlans.findByIdAndDelete(id);
    res.status(201).json({ success: true, deletedPlan });
  } catch (error) {
    console.log(error, "error in deleteAdPlan");
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

const getAppliedAdsAll = async (req, res) => {
  try {
    let appliedAds = await AppliedAds.find({}).populate("adPlanId").sort({
      createdAt: -1,
    });

    appliedAds = await User.populate(appliedAds, {
      path: "userId",
      select: "username email",
    });
    return res.json({ success: true, appliedAds: appliedAds });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal server error", error: error });
  }
};

const approveAd = async (req, res) => {
  const { id, status } = req.body;

  try {
    const ad = await AppliedAds.findById(id);
    ad.isApproved = status;

    await ad.save();
    return res.json({ success: true, msg: "Ad approved" });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  loginAdmin,
  createProfile,
  updateSiteSettings,
  logout,
  getAdmin,
  getAdmins,
  getAdminById,
  getAdminProfile,
  getMessages,
  getAdBannersAdmin,
  getAdPlans,
  createAdPlans,
  deleteAdPlan,
  getAppliedAdsAll,
  approveAd,
};
