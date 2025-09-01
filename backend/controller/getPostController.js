// include the post schema

import Post from "../database/model/postSchema.js";

export const getPost = async (req, res) => {
  try {
    const post = await Post.find({});
    // getting total post
    const totalPost = await Post.countDocuments();

    // setting date for finding the post crated in lastMonth

    const current = new Date();

    const oneMonthago = new Date(
      current.getFullYear(),
      current.getMonth() - 1,
      current.getDate()
    );

    const prevMonthPosts = await Post.countDocuments({
      createdAt: { $gte: oneMonthago },
    });
    res.status(200).json({ post, totalPost, prevMonthPosts });
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ message: "Failed to fetch posts" });
  }
};

export const getPostWithoutToken = async (req, res) => {
  try {
    const post = await Post.find({}).limit(3).sort({ createdAt: -1 });
    const totalPost = post.length;
    res.status(200).json({ post, totalPost });
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ message: "Failed to fetch posts" });
  }
};
