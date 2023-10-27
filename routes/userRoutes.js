const express = require("express");
const {
  createUser,
  loginUser,
  logout,
  getMyProfile,
} = require("../controllers/userControllers");
const { isAuthenticated } = require("../middlewares/authentication");
const mailHandler = require("../controllers/serverController");
const router = express.Router();

router.post("/register", createUser);
router.post("/login", loginUser);

router.get("/logout", logout);
router.get("/get-my-profile", isAuthenticated, getMyProfile);
router.post("/send-message", mailHandler);

module.exports = router;
