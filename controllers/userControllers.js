const User = require("../models/user");
const bcrypt = require("bcrypt");
const { sendCookies } = require("../utils/features");

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

module.exports = { createUser, loginUser, logout, getMyProfile };
