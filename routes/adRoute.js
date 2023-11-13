const express = require("express");
const { getAdBannersBL } = require("../controllers/adControllers");
const router = express.Router();

router.get("/", getAdBannersBL);

module.exports = router;
