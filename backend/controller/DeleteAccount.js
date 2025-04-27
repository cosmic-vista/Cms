// import the model first
import User from "../database/model/schema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const deleteAccount = async (req, res) => {
  try {
    // Get email from the authenticated user (middleware has set req.user)
    console.log("req.user:", req.user);
    const { userId } = req.user;

    // Check if the user exists in the database
    const check = await User.findById(userId);

    console.log("check is ", check);
    if (!check) {
      return res.status(404).json({ message: "User not found" }); // Return early to stop further execution
    }

    // Delete the user from the database
    await User.findByIdAndDelete(userId);

    // Clear the token cookie after the account is deleted
    res.clearCookie("token", {
      httpOnly: true, // Ensures the cookie is not accessible via JavaScript
      secure: true, // Set to true for production (ensure HTTPS is enabled)
      sameSite: "Strict", // Ensures the cookie is only sent for same-site requests
    });

    // Send a success response
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    // Catch any unexpected errors and send a response
    console.error(error); // Log error to server logs for debugging
    res
      .status(500)
      .json({ message: "Something went wrong. Please try again later." });
  }
};

// this is for admin panel to delete user

export const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    // Check if the user exists in the database
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" }); // Return early to stop further execution
    }

    if (user.isAdmin) {
      return res.status(403).json({ message: "Admins cannot be deleted!" });
    }

    // Delete the user from the database
    await User.findByIdAndDelete(userId);

    // Send a success response
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    // Catch any unexpected errors and send a response
    console.error(error); // Log error to server logs for debugging
    res
      .status(500)
      .json({ message: "Something went wrong. Please try again later." });
  }
};
