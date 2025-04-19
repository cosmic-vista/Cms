import express from "express";

import { SignIn } from "../controller/SignIncontroller.js";
import { SignUp } from "../controller/SignUpController.js";
import { logout } from "../controller/LogOut.js";
import { search } from "../controller/GlobalSearch.js";

import { verifyToken } from "../middleware/authMiddleware.js";
export const router = express.Router();

//router.METHOD("path", handlerFunction)
router.post("/signup", SignUp);
router.post("/signin", SignIn);
router.post("/logout", logout);
router.get("/search", search);

export default router;
