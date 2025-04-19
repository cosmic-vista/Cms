import Post from "../database/model/postSchema.js";

export const deletePost = async (req, res) => {
  const PostId = req.params.id;
  try {
    if (!PostId) {
      return res.status(400).json({ message: "PostId is required" });
    }
    await Post.findByIdAndDelete(PostId);
    res.status(200).json({ message: "post Deleted sucessfully" });
  } catch (error) {
    console.error(error); // Log error to server logs for debugging
    res
      .status(500)
      .json({ message: "Something went wrong. Please try again later." });
  }
};
