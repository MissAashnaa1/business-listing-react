const jwt = require("jsonwebtoken");
const User = require("../models/user");

const isAuthenticated = async (req, res, next) => {
  const { token } = req.cookies;
  console.log(token, "<< token");
  if (!token)
    return res
      .status(401)
      .json({ success: false, msg: "You need to login first!" });

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  console.log(decoded, "<< decoded");

  req.user = await User.findById(decoded._id);
  console.log(req.user, "<<");

  next();
};

module.exports = { isAuthenticated };
