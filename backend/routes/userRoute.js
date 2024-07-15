import express from "express";
import {
  createUser,
  loginUser,
  profileUser,
  logoutUser,
  updateProfileUser,
  updateAddressUser,
  getAllUsers,
  deleteUserById,
  deleteUserHasCheck,
} from "../controllers/userController.js";
import {
  checkAdminAuthenticate,
  checkUserAuthenticate,
} from "../middlewares/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .post(createUser)
  .get(checkUserAuthenticate, checkAdminAuthenticate, getAllUsers);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

router
  .route("/profile")
  .get(checkUserAuthenticate, profileUser)
  .put(checkUserAuthenticate, updateProfileUser);

router.route("/profile/address").put(checkUserAuthenticate, updateAddressUser);

//admin
router
  .route("/:id")
  .delete(checkUserAuthenticate, checkAdminAuthenticate, deleteUserById);

router
  .route("/delete")
  .post(checkUserAuthenticate, checkAdminAuthenticate, deleteUserHasCheck);
export default router;
