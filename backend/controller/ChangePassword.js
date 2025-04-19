import User from "../database/model/schema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const changePassword = async (req, res) => {
  const userId = req.user.userId;
  const { password, newPassword } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // compare the old password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // now if password is valid then hash the new password and store it in database
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    // assign new hashpassword to the user
    user.password = hashedPassword;
    // save the user
    await user.save();

    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    console.error("Change Password Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
