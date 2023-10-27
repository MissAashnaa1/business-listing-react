const Admin = require("../models/admin");
const bcrypt = require("bcrypt");
const { sendAdminCookies } = require("../utils/features");
const SiteSettings = require("../models/siteSettings");

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

const sendToken = (admin, statusCode, res) => {
  const token = admin.getSignedToken();
  res.cookie("token", token, {
    expires: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
    httpOnly: true,
  });
  res.status(statusCode).json({ success: true, token });
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

module.exports = {
  loginAdmin,
  createProfile,
  updateSiteSettings,
  logout,
  getAdmin,
  getAdmins,
  getAdminById,
  getAdminProfile,
};
