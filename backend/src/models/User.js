import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true, // bắt buộc phải có value
      unique: true, // khi đặt 1 field là unique thì mongoDB sẽ tự động tạo index cho trường đó --> đơn giản là sau này tìm người dùng theo username thì kết quả sẽ trả về nhanh hơn những field không được đánh index
      trim: true, // tự bỏ khoảng trắng ở đầu và cuối
      lowercase: true,
    },
    hashedPassword: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    displayName: {
      type: String,
      required: true,
      trim: true,
    },
    avatarUrl: {
      type: String, // linl CDN để hiển thị hình
    },
    avatarId: {
      type: String, // Cloudinary public_id để xóa hình ảnh trên Cloudinary
    },
    bio: {
      type: String,
      maxlength: 500, // giới hạn chiều dài của bio là 500 ký tự
    },
    phone: {
      type: String,
      sparse: true, // cho phép nullm nhưng không được trùng lặp
    },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model("User", userSchema); // tạo model
export default User;
