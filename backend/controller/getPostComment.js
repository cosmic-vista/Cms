import Comment from "../database/model/commnetShema.js";

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
