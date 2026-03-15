import express from "express";
import {
  refreshToken,
  signIn,
  signOut,
  signUp,
} from "../controllers/authController.js";

const router = express.Router();

// route đăng ký
router.post("/signup", signUp);

// route đăng nhập
router.post("/signin", signIn);

// router đăng xuất
router.post("/signout", signOut);

router.post("/refresh", refreshToken);

export default router;
