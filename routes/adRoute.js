const express = require("express");
const {
  getAdBanners,
  createAdBanner,
} = require("../controllers/adControllers");
const router = express.Router();

router.get("/", getAdBanners).post("/", createAdBanner);

module.exports = router;
