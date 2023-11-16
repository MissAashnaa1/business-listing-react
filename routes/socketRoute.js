const express = require("express");
const router = express.Router();

// testing io in api route
router.get("/", (req, res) => {
  const io = req.app.get("io");
  io.emit("test", { msg: "data from backend server to frontend" });

  setTimeout(() => {
    res.json({ msg: "socket route" });
  }, 3000);
});

module.exports = router;
