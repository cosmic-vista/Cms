import mongoose from "mongoose";
const Schema = mongoose.Schema;

// Creating the user Schema for Signup and creating new account
const UserSchema = new Schema({
  userName: { type: String, required: true, unique: true },
  email: { type: String, unique: true, required: true },
  password: {
    type: String,
    required: true,
    minlength: 4,
  },

  isAdmin: {
    type: Boolean,
    default: false,
  },
  profilePic: {
    type: String, // Can store a URL
    default: "https://cdn-icons-png.flaticon.com/512/1999/1999625.png", // Default profile pic
  },
});

// creating model for that schema

const User = mongoose.model("User", UserSchema);
export default User;
