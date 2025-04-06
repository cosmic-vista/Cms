// import the model first
import User from "../database/model/schema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

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

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid Password" });
    }

    const token = jwt.sign(
      { userId: existingUser._id.toString() },
      process.env.MY_Secrete,
      {
        expiresIn: "10m",
      }
    );

    res.cookie("token", token, {
      // Set to true if in production (HTTPS)
      maxAge: 10 * 60 * 1000, // Token expiration time (10 minutes)
    });

    res
      .status(200)
      .json({ user: existingUser, message: "Login successful", token: token });
  } catch (error) {
    res.status(500).json({ message: "failed" });
  }
};

// getting all users
export const findAll = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// delete the users

export const deleteUser = async (req, res) => {
  try {
    const email = req.body.email;
    const check = await User.findOne({ email });
    if (!check) {
      res.status(400).json({ message: "user not found" });
    }
    // if exist then delete it
    await User.deleteOne({ email });
    res.status(200).json({ message: "user deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
