const express = require("express");
const {
  createProfile,
  loginAdmin,
  updateSiteSettings,
  getAdminProfile,
} = require("../controllers/adminController");
const router = express.Router();
const { isAdmin } = require("../middlewares/adminAuth");

router.get("/", (req, res) => {
  res.send("admin route get");
});
router.post("/login", loginAdmin);
router.post("/create-profile", createProfile);
router.post("/site-settings", isAdmin, updateSiteSettings);
router.get("/get-my-profile", isAdmin, getAdminProfile);

module.exports = router;
