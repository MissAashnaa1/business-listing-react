const ServiceProvider = require("../models/serviceProvider");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { sendVerificationEMail } = require("../utils/sendEMail");
const { default: ErrorHandler } = require("../middlewares/error");

const registerServiceProvider = async (req, res, next) => {
  const {
    firstName,
    lastName,
    phone,
    email,
    password,
    stAddress,
    city,
    state,
    zip,
    category,
    serviceName,
    website,
    about,
  } = req.body;

  if (
    !firstName ||
    !lastName ||
    !phone ||
    !email ||
    !password ||
    !stAddress ||
    !city ||
    !state ||
    !zip ||
    !category ||
    !serviceName ||
    !website ||
    !about
  )
    return next(new ErrorHandler("Please enter all fields", 400));

  const serviceProvider = await ServiceProvider.findOne({ email });

  if (serviceProvider) {
    return res.status(400).json({ msg: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newServiceProvider = await ServiceProvider.create({
    firstName,
    lastName,
    contact: phone,
    email,
    password: hashedPassword,
    address: {
      street: stAddress,
      city,
      state,
      zip,
    },
    service: {
      category,
      serviceName,
      website,
      about,
    },
  });

  sendVerificationEMail(firstName, lastName, email, newServiceProvider._id);

  const token = jwt.sign(
    { id: newServiceProvider._id },
    process.env.JWT_SECRET
  );

  res.cookie("token", token, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
  });

  res.status(201).json({
    success: true,
    msg: "User created successfully!",
    token,
    user: newServiceProvider,
  });
};

module.exports = {
  registerServiceProvider,
};
