const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    category: { type: String },
    comments: [
      {
        comment: { type: String },
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        isAdmin: { type: Boolean, default: false },
      },
    ],
  },
  { timestamps: true }
);

const Comments = mongoose.model("Comment", commentSchema);

module.exports = Comments;
