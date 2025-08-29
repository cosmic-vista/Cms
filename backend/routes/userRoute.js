import express from "express";

import { verifyToken } from "../middleware/authMiddleware.js";
export const router = express.Router();
import { changePassword } from "../controller/ChangePassword.js";
import { deleteAccount, deleteUser } from "../controller/DeleteAccount.js";
import { updateProfile } from "../controller/UpdateUser.js";
import { getAllUser } from "../controller/getAlluser.js";
import { createcomment } from "../controller/createComment.js";
<<<<<<< HEAD
import {
  getPostComment,
  getAllComment,
  deleteComment,
} from "../controller/getPostComment.js";
=======
import { getPostComment, getAllComment ,deleteComment} from "../controller/getPostComment.js";
>>>>>>> 10a3016918b314305899294ede69670a00596638

router.put("/changepassword", verifyToken, changePassword);
router.put("/update", verifyToken, updateProfile);
router.delete("/deleteAccount", verifyToken, deleteAccount);
router.get("/get-all", verifyToken, getAllUser);
router.post("/comment", createcomment);
router.get("/getPostComment/:postId", getPostComment);
router.get("/get-all-Comment/", verifyToken, getAllComment);
router.delete("/delete-comment/:commentId", verifyToken, deleteComment);

export default router;
