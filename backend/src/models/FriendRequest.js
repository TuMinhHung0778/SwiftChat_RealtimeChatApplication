import mongoose from "mongoose";

const friendRequestSchema = new mongoose.Schema(
  {
    // id của người gửi lời mời kết bạn
    from: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    // người nhận lời mời kết bạn
    to: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    // tin nhắn gửi kèm theo lời mời kết bạn
    message: {
      type: String,
      maxlength: 300,
    },
  },
  {
    timestamps: true,
  },
);

friendRequestSchema.index({ from: 1, to: 1 }, { unique: true }); // thêm index để không cho gửi trùng lời mời kết bạn

friendRequestSchema.index({ from: 1 });

friendRequestSchema.index({ to: 1 });

const FriendRequest = mongoose.model("FriendRequest", friendRequestSchema);
export default FriendRequest;
