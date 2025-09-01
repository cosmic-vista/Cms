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

  const user = await User.findById(userId);
  if (!user || !user.isAdmin) {
    return res.status(403).json({ message: "Only admins are allowed" });
  }

  try {
    const CommentCount = await Comment.countDocuments();

    // Fetch recent 5 comments, newest first

    const recentComments = await Comment.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("postId", "comment")
      .populate("userId", "username");

    res.status(200).json({
      totalComments: CommentCount,
      recentComments,
    });
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteComment = async (req, res) => {
  const userId = req.user.userId;
  const { commentId } = req.params;

  const user = await User.findById(userId);
  if (!user || !user.isAdmin) {
    return res.status(403).json({ message: "Only admins are allowed" });
  }

  try {
    const deletedComment = await Comment.findByIdAndDelete(commentId);

    if (!deletedComment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.error("Error deleting comment:", error);
    res.status(500).json({ message: "Server error" });
  }
};
