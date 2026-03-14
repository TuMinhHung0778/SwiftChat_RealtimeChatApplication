import express from "express";
import dotenv from "dotenv";

const app = express(); // khởi tạo ứng dụng
const PORT = process.env.PORT || 5001;

// middlewares
app.use(express.json()); // middleware này sẽ giúp express hiểu và đọc được req.body dưới dạng JSON

app.listen((req, res) => {
  console.log(`Server bắt đầu chạy trên cổng ${PORT}`);
});
