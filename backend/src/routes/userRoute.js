// phần route api này thuộc Authorization(Phân quyền-xác minh user là ai, có quyền làm gì?)

// ==> để bảo vệ route api : {{base_url}}/users/me thì phải sử dụng middlewares

import express from "express";
import { authMe } from "../controllers/userController.js";

const router = express.Router();

router.get("/me", authMe);

export default router;
