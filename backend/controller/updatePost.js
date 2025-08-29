import Post from "../database/model/postSchema.js";

export const updatePost = async (req, res) => {
  const postId = req.params.id;
  const { title, description, category, image } = req.body;

  try {
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    // setting all the values that are send by frontend
    post.title = title || post.title;
    post.description = description || post.description;
    post.category = category || post.category;
 
    if (image?.url && image?.mimeType) {
      post.image.url = image.url;
      post.image.mimeType = image.mimeType;
    }


    const updatedPost = await post.save();

    return res.status(200).json(updatedPost);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};
