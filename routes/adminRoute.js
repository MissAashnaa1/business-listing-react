const express = require("express");
const {
  createProfile,
  loginAdmin,
  updateSiteSettings,
  getAdminProfile,
  getMessages,
  getAdBannersAdmin,
  getAdPlans,
  createAdPlans,
  deleteAdPlan,
  getAppliedAdsAll,
  approveAd,
} = require("../controllers/adminController");
const {
  createAdBanner,
  updateAdImgStatus,
} = require("../controllers/adControllers");
const router = express.Router();
const { isAdmin } = require("../middlewares/adminAuth");

router
  .get("/", (req, res) => {
    res.send("admin route get");
  })
  .post("/login", loginAdmin)
  .post("/create-profile", createProfile)
  .post("/site-settings", isAdmin, updateSiteSettings)
  .get("/get-my-profile", isAdmin, getAdminProfile)
  .get("/get-messages", isAdmin, getMessages)
  .get("/logout", (req, res) => {
    res.clearCookie("token");
    res.json({ msg: "logout success" });
  })
  .get("/get-ad", isAdmin, getAdBannersAdmin)
  .post("/post-ad", isAdmin, createAdBanner)
  .post("/switch-ad", isAdmin, updateAdImgStatus)
  .get("/ad-plans", getAdPlans)
  .post("/ad-plans", isAdmin, createAdPlans)
  .delete("/ad-plans/:id", isAdmin, deleteAdPlan)
  .get("/get-applied-ads-all", isAdmin, getAppliedAdsAll)
  .post("/approve-ad", isAdmin, approveAd);

module.exports = router;
