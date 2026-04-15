const express = require("express");
const { body, param } = require("express-validator");

const { authRequired } = require("../middleware/auth");
const { validate } = require("../middleware/validate");
const {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook
} = require("../controllers/bookController");

const router = express.Router();

// Public
router.get("/", getAllBooks);
router.get(
  "/:id",
  [param("id").isMongoId().withMessage("Invalid book id")],
  validate,
  getBookById
);

// Protected
router.post(
  "/",
  authRequired,
  [
    body("title")
      .exists({ values: "falsy" })
      .withMessage("Title is required")
      .isString()
      .trim()
      .isLength({ min: 1, max: 200 }),
    body("author")
      .exists({ values: "falsy" })
      .withMessage("Author is required")
      .isString()
      .trim()
      .isLength({ min: 1, max: 120 }),
    body("year").optional().isInt({ min: 0, max: 3000 }).toInt(),
    body("genre").optional().isString().trim().isLength({ min: 1, max: 60 }),
    body("price").optional().isFloat({ min: 0 }).toFloat(),
    body("inStock").optional().isBoolean().toBoolean()
  ],
  validate,
  createBook
);

router.put(
  "/:id",
  authRequired,
  [
    param("id").isMongoId().withMessage("Invalid book id"),
    body("title").optional().isString().trim().isLength({ min: 1, max: 200 }),
    body("author").optional().isString().trim().isLength({ min: 1, max: 120 }),
    body("year").optional().isInt({ min: 0, max: 3000 }).toInt(),
    body("genre").optional().isString().trim().isLength({ min: 1, max: 60 }),
    body("price").optional().isFloat({ min: 0 }).toFloat(),
    body("inStock").optional().isBoolean().toBoolean()
  ],
  validate,
  updateBook
);

router.delete(
  "/:id",
  authRequired,
  [param("id").isMongoId().withMessage("Invalid book id")],
  validate,
  deleteBook
);

module.exports = router;

