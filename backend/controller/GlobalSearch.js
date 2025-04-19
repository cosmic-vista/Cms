import Post from "../database/model/postSchema.js";

export const search = async (req, res) => {
  const queryParam = req.query.query;
  if (!queryParam) {
    return;
  }
  try {
    const regex = new RegExp(queryParam, "i");
    const posts = await Post.find({
      $or: [
        { title: { $regex: regex } },
        { category: { $regex: regex } },
        { description: { $regex: regex } },
      ],
    });

    res.json({ message: "sucessfully searched ", posts });
  } catch (error) {
    console.log("error while searching", error);
  }
};
