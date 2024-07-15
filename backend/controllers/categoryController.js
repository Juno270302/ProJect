import Category from "../models/categoryModel.js";
import asyncHandler from "express-async-handler";

const createCategory = asyncHandler(async (req, res) => {
  const { category_name } = req.body;

  const checkCate = await Category.findOne({ category_name: category_name });
  if (checkCate) {
    res.status(404);
    throw new Error("Category này đã có");
  }

  const newCate = await Category.create({ category_name });
  await newCate.save();

  if (newCate) {
    res.status(200).json({
      _id: newCate._id,
      category_name: newCate.category_name,
    });
  } else {
    res.status(404);
    throw new Error("Đã xảy ra lỗi khi tạo... Hãy thử lại");
  }
});

const listCategory = asyncHandler(async (req, res) => {
  const listCategory = await Category.find({});

  if (listCategory) {
    res.status(202).json(listCategory);
  } else {
    res.status(404);
    throw new Error("Không tìm thấy category nào");
  }
});

const deleteCategoryById = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const category = await Category.findByIdAndDelete({ _id: id });

  if (category) {
    res.status(202).json(category);
  }else{
    res.status(400)
    throw new Error("Đã có lỗi trong quá trình thực hiện... Hãy thử lại")
  }
});

export { createCategory, listCategory, deleteCategoryById };
