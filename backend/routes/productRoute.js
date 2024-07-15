import express from "express";
import {
  checkAdminAuthenticate,
  checkUserAuthenticate,
} from "../middlewares/authMiddleware.js";
import {
  createProduct,
  fetchProduct,
  deleteProductById,
  deleteProductByCheck,
  updateUserById,
  fetchProductById,
} from "../controllers/productController.js";

const router = express.Router();

router
  .route("/")
  .post(checkUserAuthenticate, checkAdminAuthenticate, createProduct)
  .get(fetchProduct)
  .delete(checkUserAuthenticate, checkAdminAuthenticate, deleteProductByCheck);

router
  .route("/:id")
  .get(fetchProductById)
  .delete(checkUserAuthenticate, checkAdminAuthenticate, deleteProductById)
  .put(checkUserAuthenticate, checkAdminAuthenticate, updateUserById);

export default router;
