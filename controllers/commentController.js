const Comments = require("../models/comments");

const addComment = async (req, res) => {
  console.log(req.body);
  const { category, user, comment } = req.body;
  console.log(req.user, "<< this req from web page, user");

  const newComment = await Comments.findOneAndUpdate(
    { category },
    {
      $push: {
        comments: {
          comment,
          user,
        },
      },
    },
    {
      new: true,
      upsert: true,
    }
  );
  console.log(newComment);

  res.staus(201).json({ success: true, newComment });
};

const getComments = async (req, res) => {
  const { category } = req.query;
  const comments = await Comments.find({ category }).populate("comments.user");
  res.json({ success: true, comments: comments });
};

module.exports = { addComment, getComments };
