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
const { default: ErrorHandler } = require("../middlewares/error");

const loginAdmin = async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password)
    return next(new ErrorHandler("Please provide username and password", 400));

  const admin = await Admin.findOne({ username }).select("+password");
  if (!admin) return next(new ErrorHandler("Admin does not exist.", 404));

  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) return next(new ErrorHandler("Invalid credentials", 404));

  sendAdminCookies(res, admin, "Admin logged in successfully", 200);
};

const createProfile = async (req, res, next) => {
  const { username, password, picURL, role } = req.body;

  if (!username || !password || !role)
    return next(new ErrorHandler("Please provide username and password", 400));

  const admin = await Admin.findOne({ username });
  if (admin) return next(new ErrorHandler("Admin already exists", 400));

  const hashedPassword = await bcrypt.hash(password, 10);

  const newAdmin = await Admin.create({
    username,
    password: hashedPassword,
    picURL,
    role,
  });
  sendAdminCookies(res, newAdmin, "Admin created successfully!", 201);
};

const logout = async (req, res) => {
  res.cookie("token", "none", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ success: true, msg: "Logged out" });
};

const getAdmin = async (req, res) => {
  const admin = await Admin.findById(req.admin._id).select("-password");
  res.status(200).json({ success: true, admin });
};

const getAdminProfile = async (req, res) => {
  res.status(200).json({ success: true, admin: req.admin });
};

const getAdmins = async (req, res) => {
  const admins = await Admin.find({}).select("-password");
  res.status(200).json({ success: true, admins });
};

const getAdminById = async (req, res) => {
  const admin = await Admin.findById(req.params.id).select("-password");
  res.status(200).json({ success: true, admin });
};

const updateSiteSettings = async (req, res, next) => {
  const { settingKey, settingValue } = req.body;
  if (settingKey === undefined || settingValue === undefined)
    return next(new ErrorHandler("Please provide settings", 400));

  const updatedSettings = await SiteSettings.findOneAndUpdate(
    { settingKey: settingKey },
    { settingValue: settingValue },
    { new: true, upsert: true }
  );

  res
    .status(200)
    .json({ success: true, msg: "Settings updated", updatedSettings });
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
  const adBanners = await AdBanner.find({}).sort({ createdAt: -1 });
  res.status(200).json({ success: true, adBanners });
};

const getAdPlans = async (req, res) => {
  const plans = await AdPlans.find();
  res.json({ success: true, plans: plans });
};

const createAdPlans = async (req, res, next) => {
  const { name, price, durationDays } = req.body;
  if (!name || !price || !durationDays)
    return next(new ErrorHandler("Please enter all fields", 400));

  const newPlan = await AdPlans.create({ name, price, durationDays });
  res.status(201).json({ success: true, newPlan });
};

const deleteAdPlan = async (req, res, next) => {
  const { id } = req.params;
  console.log(req.params, "params");
  if (!id) return next(new ErrorHandler("Please enter id", 400));

  const deletedPlan = await AdPlans.findByIdAndDelete(id);
  res.status(201).json({ success: true, deletedPlan });
};

const getAppliedAdsAll = async (req, res) => {
  let appliedAds = await AppliedAds.find({}).populate("adPlanId").sort({
    createdAt: -1,
  });

  appliedAds = await User.populate(appliedAds, {
    path: "userId",
    select: "username email",
  });
  return res.json({ success: true, appliedAds: appliedAds });
};

const approveAd = async (req, res) => {
  const { id, status } = req.body;

  const ad = await AppliedAds.findById(id);
  ad.isApproved = status;

  await ad.save();
  return res.json({ success: true, msg: "Ad approved" });
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
