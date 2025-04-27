import Comment from "../database/model/commnetShema.js";

// for saving comment in database
export const createcomment = async (req, res) => {
  const { username, userId, postId, comment, picture } = req.body;

  try {
    // Create a new comment document
    const newComment = new Comment({
      username,
      userId,
      postId,
      comment,
      picture,
    });

    // Save the comment to the database
    const savedComment = await newComment.save();

    res.status(201).json({
      success: true,
      message: "Comment posted successfully!",
      data: savedComment,
    });
  } catch (error) {
    console.error("Error creating comment:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to post comment",
    });
  }
};
