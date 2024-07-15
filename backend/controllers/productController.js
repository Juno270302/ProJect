import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

const createProduct = asyncHandler(async (req, res) => {
  const { name, price, category, quantity, brand, image, description } =
    req.body;

  const newProduct = await Product.create({
    name,
    price,
    category,
    quantity,
    brand,
    image,
    description,
  });
  await newProduct.save();
  if (newProduct) {
    res.status(200).json(newProduct);
  } else {
    res.status(404);
    throw new Error("Đã xảy ra lỗi trong quá trình create");
  }
});

const fetchProduct = asyncHandler(async (req, res) => {
  const product = await Product.find({});

  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404);
    throw new Error("Không tìm thấy bất kỳ product");
  }
});

const deleteProductById = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const deleteProduct = await Product.findByIdAndDelete(id);

  if (deleteProduct) {
    res.status(200).json(deleteProduct);
  } else {
    res.status(404);
    throw new Error("Không tìm thấy bất kỳ product");
  }
});

const deleteProductByCheck = asyncHandler(async (req, res) => {
  const { ids } = req.body;

  if (!ids || !Array.isArray(ids)) {
    res.status(400);
    throw new Error("Invalid request: ids should be an array");
  }

  // Delete all users with IDs in the provided array
  const deleteResult = await Product.deleteMany({ _id: { $in: ids } });

  if (deleteResult.deletedCount === 0) {
    res.status(404);
    throw new Error("No users found with the provided IDs");
  }

  res.status(200).json({
    message: "Users deleted successfully",
    deletedCount: deleteResult.deletedCount,
  });
});

const updateUserById = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const { name, price, category, quantity, brand, image, description } =
    req.body;

  const updateProduct = await Product.findById({ _id: id });

  if (updateProduct) {
    updateProduct.name = name || updateProduct.name;
    updateProduct.price = price || updateProduct.price;
    updateProduct.category = category || updateProduct.category;
    updateProduct.quantity = quantity || updateProduct.quantity;
    updateProduct.brand = brand || updateProduct.brand;
    updateProduct.image = image || updateProduct.image;
    updateProduct.description = description || updateProduct.description;
  }
  const checkSave = await updateProduct.save();
  res.status(200).json(checkSave);
});

const fetchProductById = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const updateProduct = await Product.findById({ _id: id });

  if (updateProduct) {
    res.status(200).json(updateProduct);
  } else {
    res.status(400);
    throw new Error("Chúng tôi không tìm thấy sản phẩm nào");
  }
});

export {
  createProduct,
  fetchProduct,
  deleteProductById,
  deleteProductByCheck,
  updateUserById,
  fetchProductById,
};
