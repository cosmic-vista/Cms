import Post from "../database/model/postSchema.js";

export const createPost = async (req, res, next) => {
  // checking if the user in admin or not

  if (!req.user.isAdmin) {
    return res
      .status(403)
      .json({ message: "You are not allowed to create a post" });
  }

  // for slug ye jo bhi likhenge uska slug banega
  // is code tak aate aate mere haalt kharab ho gyi thi
  // slug kyu le rha samjh to thoda thoda aa rha taaki datavse se isko ek url de SAKTE
  if (typeof req.body.title !== "string") {
    return res.status(400).json({ message: "Title must be a string." });
  }

  //   Slug kya hai?
  //   Slug ek readable, URL-friendly string hoti hai jo aapke content ko uniquely identify karti hai. Jaise aapka post ka title "My First Blog Post" hai, uska slug kuch is tarah ka ho sakta hai:

  //   my-first-blog-post

  //   URL mein spaces nahi honge, aur special characters ko replace kiya jayega.

  const slug = req.body.title
    .split(/\s+/) // Make sure to split by spaces to handle multiple words correctly
    .join("-")
    .toLowerCase()
    .replace(/[^a-zA-Z0-9-]/g, ""); // Allow hyphens for separating words

  const newPost = new Post({
    ...req.body,

    userId: req.user.userId,
    slug: slug,
  });

  try {
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    next(error);
  }
};
