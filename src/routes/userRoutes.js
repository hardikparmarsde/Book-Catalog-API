const express = require("express");
const { body } = require("express-validator");

const { validate } = require("../middleware/validate");
const { register, login } = require("../controllers/userController");

const router = express.Router();

router.post(
  "/register",
  [
    body("name").optional().isString().trim().isLength({ min: 1, max: 80 }),
    body("email")
      .exists({ values: "falsy" })
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Invalid email")
      .normalizeEmail(),
    body("password")
      .exists({ values: "falsy" })
      .withMessage("Password is required")
      .isString()
      .withMessage("Password must be a string")
      .isLength({ min: 6, max: 72 })
      .withMessage("Password must be 6-72 characters")
  ],
  validate,
  register
);

router.post(
  "/login",
  [
    body("email")
      .exists({ values: "falsy" })
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Invalid email")
      .normalizeEmail(),
    body("password")
      .exists({ values: "falsy" })
      .withMessage("Password is required")
      .isString()
      .withMessage("Password must be a string")
      .isLength({ min: 1, max: 72 })
      .withMessage("Password is required")
  ],
  validate,
  login
);

module.exports = router;

