const express = require("express");
const {
  createUser,
  loginUser,
  logout,
  getMyProfile,
  checkEmailValidity,
  applyForAd,
  getAppliedAds,
} = require("../controllers/userControllers");
const { isAuthenticated } = require("../middlewares/authentication");
const mailHandler = require("../controllers/serverController");

const router = express.Router();

router.post("/register", createUser);
router.post("/login", loginUser);

router.get("/logout", logout);
router.get("/get-my-profile", isAuthenticated, getMyProfile);
router.post("/send-message", mailHandler);
router.post("/check-email-validity", checkEmailValidity);
router.post("/apply-for-ad", isAuthenticated, applyForAd);
router.post("/get-applied-ads", isAuthenticated, getAppliedAds);

module.exports = router;
