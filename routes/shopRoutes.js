import express from "express";
import {
  createShop,
  getShops,
  getShop,
  deleteShop,
  updateShop,
  getUserShops,
} from "../controllers/shopController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(protect, getShops).post(protect, createShop);
router
  .route("/:id") //:id is a placeholder for the id of the shop
  .get(protect, getShop)
  .delete(protect, deleteShop)
  .put(protect, updateShop);
router.route("/:id/user").get(protect, getUserShops);

export default router;
