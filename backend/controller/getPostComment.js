import Comment from "../database/model/commnetShema.js";
import User from "../database/model/schema.js";

export const getPostComment = async (req, res) => {
  const postId = req.params.postId;

  try {
    if (!postId) {
      return res.status(400).json("postId required");
    }

    const messages = await Comment.find({ postId }).sort({ createdAt: -1 });
    res.status(200).json(messages);
  } catch (error) {
    console.log(error, "error while fetching comment");
  }
};

export const getAllComment = async (req, res) => {
  const userId = req.user.userId;

  const model = await User.findById(userId);
  if (!model && !model.isAdmin) {
    return res.status(404).json({ message: "only admin are allowed " });
  }
  try {
    const CommentCount = await Comment.countDocuments();
    res.status(200).json(CommentCount);
  } catch (error) {
    console.log(error, "error while Counting comment");
  }
};
