import User from "../database/model/schema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const logout = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logged out successfully" });
};
