import Post from "../database/model/postSchema.js";

export const getSlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const post = await Post.findOne({ slug });
    res.status(200).json(post);
  } catch (error) {
    console.log("Error in getSlug");
  }
};
