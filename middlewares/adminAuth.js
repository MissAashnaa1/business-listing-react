const jwt = require("jsonwebtoken");
const Admin = require("../models/admin");

const isAdmin = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token)
    return res
      .status(401)
      .json({ success: false, msg: "You need to login first!" });

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  req.admin = await Admin.findById(decoded._id);
  next();
};

module.exports = { isAdmin };
