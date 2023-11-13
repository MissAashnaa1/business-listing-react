const jwt = require("jsonwebtoken");

const sendCookies = (res, user, message, statusCode = 200) => {
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

  res
    .status(statusCode)
    .cookie("token", token, {
      httpOnly: true,
      // // expires: new Date(Date.now() + 3600000),
      // maxAge: 15 * 60 * 1000, // 15 minutes active time
      // // maxAge: 1 * 10 * 1000, // 10 seconds active time
      sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
      secure: process.env.NODE_ENV === "Development" ? false : true,
    })
    .json({
      username: user.username,
      email: user.email,
      success: true,
      message,
    });
};

const sendAdminCookies = (res, admin, message, statusCode = 200) => {
  const token = jwt.sign({ _id: admin._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res
    .status(statusCode)
    .cookie("token", token, {
      httpOnly: true,
      // maxAge: 24 * 60 * 60 * 1000, // active time
      maxAge: 12 * 60 * 60 * 1000, // active time
      sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
      secure: process.env.NODE_ENV === "Development" ? false : true,
    })
    .json({
      username: admin.username,
      picURL: admin.picURL,
      role: admin.role,
      success: true,
      message,
    });
};

module.exports = { sendCookies, sendAdminCookies };
