import bcrypt from "bcrypt";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import Session from "../models/Session.js";

const ACCESS_TOKEN_TTL = "30m"; // thường là dưới 15m
const REFRESH_TOKEN_TTL = 14 * 24 * 60 * 60 * 1000; // 14 ngày theo ms

// đăng ký
export const signUp = async (req, res) => {
  try {
    const { username, password, email, firstName, lastName } = req.body; // đầu tiên sẽ lấy dữ liệu người dùng gửi lên từ req.body

    if (!username || !password || !email || !firstName || !lastName) {
      return res.status(400).json({
        message:
          "Không thể hiếu username, password, email, firstName và lastName",
      });
    }

    // kiểm tra username đã tồn tại chưa
    const duplicate = await User.findOne({ username });

    if (duplicate) {
      return res.status(409).json({ message: "username đã tồn tại" });
    }

    // mã hóa password
    const hashedPassword = await bcrypt.hash(password, 10); // salt = 10

    // tạo user mới
    await User.create({
      username,
      hashedPassword,
      email,
      displayName: `${firstName} ${lastName}`,
    });

    // return
    return res.sendStatus(204); // status 204 nghĩa là request thành công nhưng không cần gửi thêm data
  } catch (error) {
    console.error("Lỗi khi gọi signUp", error);
    return res.status(500).json({ message: "Lỗi hệ thống" });
  }
};

// đăng nhập
export const signIn = async (req, res) => {
  try {
    // lấy inputs(usernam, password mà người dùng gửi cho server) từ req.body
    const { username, password } = req.body; // --> dùng Object Destructuring để lấy ra username và password

    if (!username || !password) {
      return res.status(400).json({ message: "Thiếu username hoặc password." });
    }

    // lấy hashedPassword trong db để so với password input mà người dùng vừa nhập
    const user = await User.findOne({ username }); // tìm user trong DB = username

    if (!user) {
      return res
        .status(401)
        .json({ message: "username hoặc password không chính xác." });
    }

    // kiểm tra password
    const passwordCorrect = await bcrypt.compare(password, user.hashedPassword);

    if (!passwordCorrect) {
      return res
        .status(401)
        .json({ message: "username hoặc password không chính xác." });
    }

    // nếu khớp, tạo accessToken với JWT
    const accessToken = jwt.sign(
      { userId: user._id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: ACCESS_TOKEN_TTL },
    ); // cái hàm wt.sign() này có 3 tham số truyền vào --> đây chính là payload(những thông tin mà chúng ta gửi vào accessToken)

    // tạo refreshToken
    const refreshToken = crypto.randomBytes(64).toString("hex");

    // lưu refreshToken vào 1 session trong database để quản lý(tạo session mới để lưu refreshToken)
    await Session.create({
      userId: user._id,
      refreshToken,
      expiresAt: new Date(Date.now() + REFRESH_TOKEN_TTL),
    });

    // trả refreshToken về cho client thông qua cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none", //backend, frontend deploy riêng
      maxAge: REFRESH_TOKEN_TTL,
    });

    // còn accessToken trả thẳng về trong response
    return res
      .status(200)
      .json({ message: `User ${user.displayName} đã logged in!`, accessToken });
  } catch (error) {
    console.error("Lỗi khi gọi signIn", error);
    return res.status(500).json({ message: "Lỗi hệ thống" });
  }
};

// đăng xuất
export const signOut = async (req, res) => {
  try {
    // lấy refresh token từ cookie
    const token = req.cookies?.refreshToken; // để đọc được cookie thì cần dùng 1 thư viện có tên cookie-parser--> dòng code này hoạt động được là nhờ thư viện cookie-parser, nếu không có cookie-parser thì req.cookies sẽ luôn bị undefined

    if (token) {
      // xóa refresh token trong Session
      await Session.deleteOne({ refreshToken: token });

      // xóa refresh token trong cookie trình duyệt, đảm bảo người dùng không còn token nào lưu lại trong client nữa
      res.clearCookie("refreshToken");
    }

    return res.sendStatus(204);
  } catch (error) {
    console.error("Lỗi khi gọi signOut", error);
    return res.status(500).json({ message: "Lỗi hệ thống" });
  }
};

// tạo access token mới từ refresh token
export const refreshToken = async (req, res) => {
  try {
    // lấy refresh token từ cookie
    const token = req.cookies?.refreshToken;
    if (!token) {
      return res.status(401).json({ message: "Token không tồn tại." });
    }

    // so với refresh token trong db
    const session = await Session.findOne({ refreshToken: token });

    if (!session) {
      return res
        .status(403)
        .json({ message: "Token không hợp lệ hoặc đã hết hạn" });
    }

    // kiểm tra hết hạn chưa
    if (session.expiresAt < new Date()) {
      return res.status(403).json({ message: "Token đã hết hạn." });
    }

    // tạo access token mới
    const accessToken = jwt.sign(
      {
        userId: session.userId,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: ACCESS_TOKEN_TTL },
    );

    // return
    return res.status(200).json({ accessToken });
  } catch (error) {
    console.error("Lỗi khi gọi refreshToken", error);
    return res.status(500).json({ message: "Lỗi hệ thống" });
  }
};
