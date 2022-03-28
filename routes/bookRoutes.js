import express from "express";
import {
  createBook,
  getBooks,
  deleteBook,
  updateBook,
  getBook,
  getUserBooks,
} from "../controllers/bookController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(protect, getBooks).post(protect, createBook);
router
  .route("/:id")
  .get(protect, getBook)
  .put(protect, updateBook)
  .delete(protect, deleteBook);

router.route("/user/:id").get(protect, getUserBooks);

export default router;
