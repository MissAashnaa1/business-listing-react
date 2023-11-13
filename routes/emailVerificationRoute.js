const express = require("express");
const router = express.Router();

const { verifyEmail } = require("../controllers/emailVerificationController");

router.get("/", verifyEmail);

module.exports = router;
