import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";

const checkUserAuthenticate = asyncHandler(async (req, res, next) => {
  let token;
  token = req.cookies.jwt;
  if (token) {
    //decode verify ra id Người dùng
    const decode = await jwt.verify(token, process.env.JWT_SECRET);
    //select("-password") để tránh lấy password
    req.user = await User.findById(decode.userId).select("-password");
    next();
  } else {
    res.status(400);
    throw new Error("Không tìm thấy người dùng, token not found");
  }
});

const checkAdminAuthenticate = asyncHandler(async (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(400);
    throw new Error("Không tìm thấy người dùng, token not found");
  }
});

export { checkUserAuthenticate, checkAdminAuthenticate };
