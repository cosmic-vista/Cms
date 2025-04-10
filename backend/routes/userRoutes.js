import express from "express";

import {
  SignIn,
  SignUp,
  changePassword,
  logout,
} from "../controller/userController.js";

import { verifyToken } from "../middleware/authMiddleware.js";
export const router = express.Router();

//router.METHOD("path", handlerFunction)
router.post("/signup", SignUp);
router.post("/signin", SignIn);
router.post("/logout", logout);
router.put("/changepassword", verifyToken, changePassword);

export default router;
