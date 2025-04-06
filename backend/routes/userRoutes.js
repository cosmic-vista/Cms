import express from "express";
import {
  findAll,
  deleteUser,
  SignIn,
  SignUp,
} from "../controller/userController.js";
const router = express.Router();

//router.METHOD("path", handlerFunction)
router.post("/signup", SignUp);
router.post("/signin", SignIn);
router.get("/getall", findAll);
router.delete("/delete", deleteUser);
export default router;
