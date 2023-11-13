const express = require("express");
const {
  registerServiceProvider,
} = require("../controllers/serviceProviderController");
const { verifyEmail } = require("../controllers/emailVerificationController");
const router = express.Router();

// router.post("/login", loginServiceProvider);
router.get("/verify", verifyEmail);
router.post("/register", registerServiceProvider);

module.exports = router;
