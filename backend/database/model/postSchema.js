import mongoose from "mongoose";
const Schema = mongoose.Schema;

// defining Schema for Create-post

const postSchema = new Schema(
  {
    userId: {
      type: String,
    },
    title: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      default: "uncategorized",
    },
    image: {
      type: String,
    },
    description: {
      type: String,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);
const Post = mongoose.model("Post", postSchema);
export default Post;
