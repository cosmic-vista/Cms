import express from "express";

import {
  SignIn,
  SignUp,
  changePassword,
} from "../controller/userController.js";

import { verifyToken } from "../middleware/authMiddleware.js";
export const router = express.Router();

//router.METHOD("path", handlerFunction)
router.post("/signup", SignUp);
router.post("/signin", SignIn);

router.put("/changepassword", verifyToken, changePassword);

export default router;
