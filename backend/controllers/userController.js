import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import bcryptjs from "bcryptjs";
import createToken from "../utils/createToken.js";
import jwt from "jsonwebtoken";

//Register
const createUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  const checkEmail = await User.findOne({ email });
  const checkUsername = await User.findOne({ username });

  if (checkEmail) {
    res.status(409);
    throw new Error("Tài khoản email này đã tồn tại");
  }

  if (checkUsername) {
    res.status(409);
    throw new Error("Tài khoản username này đã tồn tại");
  }

  const salt = await bcryptjs.genSalt(10);
  const hashPassword = await bcryptjs.hash(password, salt);

  const userNew = await User.create({
    username,
    email,
    password: hashPassword,
  });
  await userNew.save();

  if (userNew) {
    createToken(res, userNew._id);
    res.status(201).json({
      _id: userNew._id,
      username: userNew.username,
      email: userNew.email,
      password: userNew.password,
      role: userNew.role,
    });
  } else {
    res.status(400);
    throw new Error("Đã xảy ra lỗi trong quá trình đăng ký");
  }
});

//Login
const loginUser = asyncHandler(async (req, res) => {
  const { email, username, password } = req.body;

  const checkAccountEmail = await User.findOne({ email });
  const checkAccountUsername = await User.findOne({ username });

  //Đăng nhập bằng Email
  if (checkAccountEmail) {
    const passwordValid = await bcryptjs.compare(
      password,
      checkAccountEmail.password
    );
    if (passwordValid) {
      createToken(res, checkAccountEmail._id);
      res.status(200).json({
        _id: checkAccountEmail._id,
        username: checkAccountEmail.username,
        email: checkAccountEmail.email,
        role: checkAccountEmail.role,
      });
    } else {
      res.status(400);
      throw new Error("Tài khoản hoặc mật khẩu không chính xác");
    }

    //Đăng nhập bằng username
  } else if (checkAccountUsername) {
    const passwordValid = await bcryptjs.compare(
      password,
      checkAccountUsername.password
    );
    if (passwordValid) {
      createToken(res, checkAccountUsername._id);
      res.status(200).json({
        _id: checkAccountUsername._id,
        username: checkAccountUsername.username,
        email: checkAccountUsername.email,
        role: checkAccountUsername.role,
      });
    } else {
      res.status(400);
      throw new Error("Tài khoản hoặc mật khẩu không chính xác");
    }

    //Khi đăng nhập bị lỗi
  } else {
    res.status(404);
    throw new Error("Tài khoản hoặc mật khẩu không chính xác");
  }
});

const logoutUser = asyncHandler(async (req, res) => {
  await res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logout Success!!!" });
});

const profileUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(400);
    throw new Error("Không tìm thấy người dùng");
  }
});

const updateProfileUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  const {
    username,
    email,
    password,
    full_name,
    phone_number,
    user_image,
    role,
  } = req.body;

  if (user) {
    user.username = username || user.username;
    user.email = email || user.email;
    user.full_name = full_name || user.full_name;
    user.phone_number = phone_number || user.phone_number;
    user.user_image = user_image || user.user_image;
    user.role = role || user.role;

    if (password) {
      const salt = await bcryptjs.genSalt(10);
      const hashPassword = await bcryptjs.hash(password, salt);
      user.password = hashPassword;
    }

    const updateUser = await user.save();

    res.status(200).json(updateUser);
  } else {
    res.status(400);
    throw new Error("Không tìm thấy người dùng");
  }
});

const updateAddressUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  const { street, city, state, zip, country } = req.body;

  if (user) {
    if (!user.address) {
      user.address = { street, city, state, zip, country };
      res.status(200).json(user);
    }
    user.address.street = street || user.address.street;
    user.address.city = city || user.address.city;
    user.address.state = state || user.address.state;
    user.address.zip = zip || user.address.zip;
    user.address.country = country || user.address.country;

    const updateAddress = await user.save();
    res.status(200).json(updateAddress);
  } else {
    res.status(200).json({ hello: "hello" });
  }
});

const getAllUsers = asyncHandler(async (req, res) => {
  const user = await User.find({});
  res.status(200).json(user);
});

const deleteUserById = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const deleteUser = await User.findByIdAndDelete(id);

  res.status(200).json(deleteUser);
});

const deleteUserHasCheck = asyncHandler(async (req, res) => {
  const { ids } = req.body;

  if (!ids || !Array.isArray(ids)) {
    res.status(400);
    throw new Error("Invalid request: ids should be an array");
  }

  // Delete all users with IDs in the provided array
  const deleteResult = await User.deleteMany({ _id: { $in: ids } });

  if (deleteResult.deletedCount === 0) {
    res.status(404);
    throw new Error("No users found with the provided IDs");
  }

  res
    .status(200)
    .json({
      message: "Users deleted successfully",
      deletedCount: deleteResult.deletedCount,
    });
});

export {
  createUser,
  loginUser,
  logoutUser,
  profileUser,
  updateProfileUser,
  updateAddressUser,
  getAllUsers,
  deleteUserById,
  deleteUserHasCheck,
};
