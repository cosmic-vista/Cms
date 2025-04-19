import express from "express";

import { verifyToken } from "../middleware/authMiddleware.js";
export const router = express.Router();
import { changePassword } from "../controller/ChangePassword.js";
import { deleteUser } from "../controller/DeleteUser.js";
import { updateProfile } from "../controller/UpdateUser.js";

router.put("/changepassword", verifyToken, changePassword);
router.put("/update", verifyToken, updateProfile);
router.delete("/deleteAccount", verifyToken, deleteUser);

export default router;
