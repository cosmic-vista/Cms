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
// writing function to login user
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
      { userId: existingUser._id },
      process.env.MY_Secrete,
      {
        expiresIn: "15m",
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
      message: "Login successful",
      user: {
        id: existingUser._id,
        email: existingUser.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "failed" });
  }
};

// change password
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

// function for logout

export const logout = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logged out successfully" });
};

// //  export const chnagePassword = async(req,res)=>{
// //   try{
// //  const {}
// //   }catch(error){
// //     res.status(500).json({ message: "failed" });
// //   }
// //  }

// // getting all users
// export const findAll = async (req, res) => {
//   try {
//     const users = await User.find();
//     res.status(200).json(users);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // delete the users

// export const deleteUser = async (req, res) => {
//   try {
//     const email = req.body.email;
//     const check = await User.findOne({ email });
//     if (!check) {
//       res.status(400).json({ message: "user not found" });
//     }
//     // if exist then delete it
//     await User.deleteOne({ email });
//     res.status(200).json({ message: "user deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
