const mongoose = require("mongoose");

const Book = require("../models/Book");

function isValidObjectId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}

async function createBook(req, res, next) {
  try {
    const { title, author, year, genre, price, inStock } = req.body;

    const book = await Book.create({
      title,
      author,
      year,
      genre,
      price,
      inStock,
      createdBy: req.user?.id
    });

    return res.status(201).json({
      success: true,
      message: "Book created successfully",
      data: { book }
    });
  } catch (err) {
    return next(err);
  }
}

async function getAllBooks(_req, res, next) {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      message: "Books fetched successfully",
      data: { books }
    });
  } catch (err) {
    return next(err);
  }
}

async function getBookById(req, res, next) {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return res.status(400).json({ success: false, message: "Invalid book id" });
    }

    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ success: false, message: "Book not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Book fetched successfully",
      data: { book }
    });
  } catch (err) {
    return next(err);
  }
}

async function updateBook(req, res, next) {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return res.status(400).json({ success: false, message: "Invalid book id" });
    }

    const { title, author, year, genre, price, inStock } = req.body;

    const book = await Book.findByIdAndUpdate(
      id,
      { title, author, year, genre, price, inStock },
      { new: true, runValidators: true }
    );

    if (!book) {
      return res.status(404).json({ success: false, message: "Book not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Book updated successfully",
      data: { book }
    });
  } catch (err) {
    return next(err);
  }
}

async function deleteBook(req, res, next) {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return res.status(400).json({ success: false, message: "Invalid book id" });
    }

    const book = await Book.findByIdAndDelete(id);
    if (!book) {
      return res.status(404).json({ success: false, message: "Book not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Book deleted successfully",
      data: { book }
    });
  } catch (err) {
    return next(err);
  }
}

module.exports = {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook
};

