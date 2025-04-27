import express from "express";

import { verifyToken } from "../middleware/authMiddleware.js";

import { createPost } from "../controller/createPost.js";
import { getPost } from "../controller/getPostController.js";
import { deletePost } from "../controller/DeletePost.js";
import { getSlug } from "../controller/fetchSlug.js";
export const router = express.Router();
import { getAllUser } from "../controller/getAlluser.js";
import { updatePost } from "../controller/updatePost.js";

router.post("/create", verifyToken, createPost);
router.get("/getPost", getPost);
router.delete("/deletePost/:id", deletePost);
router.get("/posts/slug/:slug", getSlug);

router.get("/get-all", verifyToken, getAllUser);

router.put("/updatePost/:id", updatePost);
export default router;
