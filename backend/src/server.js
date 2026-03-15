import express from "express";
import dotenv from "dotenv";
import { connnectDB } from "./libs/db.js";
import authRoute from "./routes/authRoute.js";
import userRoute from "./routes/userRoute.js";
import friendRoute from "./routes/friendRoute.js";
import messageRoute from "./routes/messageRoute.js";
import conversationRoute from "./routes/conversationRoute.js";
import cookieParser from "cookie-parser";
import { protectedRoute } from "./middlewares/authMiddleware.js";
import cors from "cors";

dotenv.config();

const app = express(); // khởi tạo ứng dụng
const PORT = process.env.PORT || 5001;

// middlewares
app.use(express.json()); // middleware này sẽ giúp express hiểu và đọc được req.body dưới dạng JSON
app.use(cookieParser());
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));

// public routes - thuộc phần Authentication
app.use("/api/auth", authRoute);

// private routes - thuộc phần Authorization
app.use(protectedRoute);
app.use("/api/users", userRoute);
app.use("/api/friends", friendRoute);
app.use("/api/messages", messageRoute);
app.use("/api/conversations", conversationRoute);

// .then() là method của Promise --> đảm bảo rằng chỉ khi kết nối DB thành công thì server mới bắt đầu chạy
connnectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server bắt đầu chạy trên cổng ${PORT}`);
  });
});
