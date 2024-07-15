import express from "express";
import {
  checkAdminAuthenticate,
  checkUserAuthenticate,
} from "../middlewares/authMiddleware.js";
import {
  createCategory,
  listCategory,
  deleteCategoryById,
} from "../controllers/categoryController.js";

const router = express.Router();

router
  .route("/")
  .post(checkUserAuthenticate, checkAdminAuthenticate, createCategory)
  .get(checkUserAuthenticate, checkAdminAuthenticate, listCategory);

router
  .route("/:id")
  .delete(checkUserAuthenticate, checkAdminAuthenticate, deleteCategoryById);

export default router;
