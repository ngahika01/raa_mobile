import Book from "../models/bookModel.js";
import asyncHandler from "express-async-handler";

// Get all books
const getBooks = asyncHandler(async (req, res) => {
  const books = await Book.find().populate("user").populate("shop");
  res.status(200).json(books);
});

// Get single book
const getBook = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (book) {
    res.json(book);
  } else {
    res.status(404);
    throw new Error("Book not found");
  }
});

// Create book
const createBook = asyncHandler(async (req, res) => {
  const { shop, completed, phoneNumber } = req.body;
  const book = await Book.create({
    shop,
    user: req.user,
    completed,
    phoneNumber,
  });
  res.status(201).json(book);
});

// Update book
const updateBook = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (book) {
    book.completed = req.body.completed;
    await book.save();
    res.json(book);
  } else {
    res.status(404);
    throw new Error("Book not found");
  }
});

// Delete book
const deleteBook = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (book) {
    await book.remove();
    res.json(book);
  } else {
    res.status(404);
    throw new Error("Book not found");
  }
});
// get logged in user's books
const getUserBooks = asyncHandler(async (req, res) => {
  const books = await Book.find({ user: req.params.id }).populate("user");
  res.status(200).json(books);
});

export { getBooks, getBook, createBook, updateBook, deleteBook, getUserBooks };
