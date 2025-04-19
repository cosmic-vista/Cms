// include the post schema

import Post from "../database/model/postSchema.js";

export const getPost = async (req, res) => {
  try {
    const post = await Post.find({});

    res.status(200).json(post, "All posts are fetched ");
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ message: "Failed to fetch posts" });
  }
};
