// import the model first
import User from "../database/model/schema.js";
import bcrypt from "bcryptjs";

// writing function to create user for signup

export const SignUp = async (req, res) => {
  try {
    const { userName, email, password } = req.body;

    if (!userName || !email || !password) {
      return res.status(400).json({
        message: "All fileds are required",
      });
    }

    // here checking user already exist with this email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ message: "User already exists with this email" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // creating and saving the new user
    const newUser = await User.create({
      userName,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "Signup Sucessfull",
      user: newUser,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
