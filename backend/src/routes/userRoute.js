// phần route api này thuộc Authorization(Phân quyền-xác minh user là ai, có quyền làm gì?)

// ==> để bảo vệ route api : {{base_url}}/users/me thì phải sử dụng middlewares

import express from "express";
import {
  authMe,
  getAllUsers,
  searchUserByUsername,
  uploadAvatar,
} from "../controllers/userController.js";
import { upload } from "../middlewares/uploadMiddleware.js";

const router = express.Router();

router.get("/", getAllUsers);
router.get("/me", authMe);
router.get("/search", searchUserByUsername);
router.post("/uploadAvatar", upload.single("file"), uploadAvatar);

export default router;
