const User = require("../models/user");
const ServiceProvider = require("../models/serviceProvider");
const bcrypt = require("bcrypt");
const { sendCookies } = require("../utils/features");
const axios = require("axios");
const AppliedAds = require("../models/appliedAds");
const { sendEmailAppliedAd } = require("../utils/sendEMail");

const createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    console.log(req.body);

    let user = await User.findOne({ username });

    if (user) {
      res.status(400).json({ msg: "User already exists!" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user = await User.create({ username, email, password: hashedPassword });

    sendCookies(res, user, "User created successfully!");
  } catch (error) {
    console.log(error, "error in createUser");
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    let user = await User.findOne({ username }).select("+password");

    if (!user) {
      res.status(400).json({ msg: "User does not exist!" });
      return;
    }

    const isMatch = bcrypt.compare(password, user.password);

    if (!isMatch) {
      res.status(400).json({ msg: "User does not exist!" });
      return;
    }

    sendCookies(res, user, `Welcome back ${user.username}!`);
  } catch (error) {
    console.log(error, "error in loginUser");
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

const getMyProfile = async (req, res) => {
  res.status(200).json({ success: true, user: req.user });
};

const logout = (req, res) => {
  const { token } = req.cookies;
  if (!token) {
    res.status(400).json({
      msg: "Please login first!",
    });
    return;
  } else {
    res
      .status(200)
      .cookie("token", "", {
        expires: new Date(Date.now()),
        sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
        secure: process.env.NODE_ENV === "Development" ? false : true,
      })
      .json({
        success: true,
        user: req.user,
      });
  }
};

const checkEmailValidity = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.json({ success: false, msg: "Email is not valid" });
  try {
    const { data: verification } = await axios.get(
      `https://client.bulkemailverifier.com/api/singlemaildetails?secret=${process.env.MAIL_VERIFIER_KEY}&email=${email}`
    );
    if (verification && verification.success) {
      if (verification.result === "valid") {
        const serviceProvider = await ServiceProvider.findOne({
          email: email,
        });
        if (serviceProvider)
          return res.json({
            success: false,
            msg: "Email already exists",
          });

        return res.json({ success: true, msg: "Email is valid" });
      } else {
        return res.json({
          success: false,
          msg: "Email is not valid",
        });
      }
    } else {
      return res.json({
        success: false,
        msg: "Email is not valid",
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({ success: false, msg: "Email is not valid 3", error });
  }
};

const applyForAd = async (req, res) => {
  const { userId, adLabel, adImage, planObj } = req.body;

  if (!userId || !adLabel || !adImage || !planObj) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  try {
    const newAppliedAd = await AppliedAds.create({
      userId,
      adLabel,
      adURL: adImage,
      adPlanId: planObj.value,
    });

    console.log(newAppliedAd);

    const io = req.app.get("io");

    io.emit("newAppliedAdToAdmin", { newAppliedAd });
    const user = await User.findById(userId);
    if (user) {
      sendEmailAppliedAd(user.username, user.email);
    }
    res.status(201).json({ success: true, newAppliedAd });
  } catch (error) {
    console.log(error, "error in applyForAd");
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

const getAppliedAds = async (req, res) => {
  try {
    const appliedAds = await AppliedAds.find({ userId: req.user._id })
      .populate("adPlanId")
      .sort({
        createdAt: -1,
      });
    res.status(200).json({ success: true, appliedAds });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, msg: "Server error" });
  }
};

module.exports = {
  getAppliedAds,
  createUser,
  loginUser,
  logout,
  getMyProfile,
  checkEmailValidity,
  applyForAd,
};
