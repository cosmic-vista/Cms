// import the model first
import User from "../database/model/schema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const SignIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );
    console.log("isPasswordValid", isPasswordValid);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid Password" });
    }

    // checking for user Secreate key
    if (!process.env.MY_Secrete) {
      console.log("❗ SECRET_KEY not defined in .env");
      return res
        .status(500)
        .json({ message: "Server error: SECRET_KEY missing" });
    }
    // Generating token during sign-in
    const token = jwt.sign(
      { userId: existingUser._id, isAdmin: existingUser.isAdmin },
      process.env.MY_Secrete,
      {
        expiresIn: "1h",
      }
    );

    // setting cookies
    res.cookie("token", token, {
      httpOnly: true,
      secure: true, // only sent over HTTPS
      sameSite: "Strict", // or 'Lax' depending on your frontend/backend setup
      maxAge: 15 * 60 * 1000, // 15 minutes
    });

    res.status(200).json({
      message: { "Login successful": existingUser.isAdmin },
      user: {
        id: existingUser._id,
        username: existingUser.userName,
        email: existingUser.email,
        profilePic: existingUser.profilePic,
        token: token,
        isAdmin: existingUser.isAdmin,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "failed" });
  }
};
