const express = require("express");
const { addComment, getComments } = require("../controllers/commentController");
const router = express.Router();

router.post("/add", addComment).get("/get-all", getComments);

module.exports = router;
