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
      url: { type: String, required: true },
      mimeType: { type: String, required: true },
    },
    description: {
      type: String,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);
const Post = mongoose.model("Post", postSchema);
export default Post;
