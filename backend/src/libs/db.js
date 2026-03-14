import mongoose from "mongoose";

export const connnectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECTIONSTRING);
    console.log("Liên kết CSDL thành công!");
  } catch (error) {
    console.log("Lỗi khi kết nối CSDL:", error);
    process.exit(1); // dừng chương trình nếu không connect được với Database
  }
};
