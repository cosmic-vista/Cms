import User from "../database/model/schema.js";
import bcrypt from "bcryptjs";

export const updateProfile = async (req, res) => {
  const userId = req.user.userId;
  const { username, email, password, newPassword, profilePic } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Update basic fields
    if (username) user.userName = username;
    // if (email) user.email = email;
    if (profilePic) user.profilePic = profilePic;

    // Update password only if newPassword is provided
    if (newPassword) {
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(400).json({ message: "Invalid current password" });
      }
      user.password = await bcrypt.hash(newPassword, 10);
    }

    await user.save();

    console.log("user updated sucesfully ", user);
    res.status(200).json({
      message: "Profile updated successfully",
      user: {
        id: user._id,
        username: user.userName,
        email: user.email,
        profilePic: user.profilePic,
         isAdmin: user.isAdmin, // adding this so that i can fix my admin panel switching 
      },
    });
  } catch (error) {
    console.error("Update Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
