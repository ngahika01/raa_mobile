import express from "express";
import {
  authUser,
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/usersController.js";
import { admin, protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.route("/").get(protect, admin, getUsers).post(createUser);
router.route("/auth").post(authUser);
router
  .route("/:id")
  .get(protect, getUser)
  .delete(protect, deleteUser)
  .put(protect, updateUser);
export default router;
