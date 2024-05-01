const { body } = require("express-validator");

const createIncomeValidation = [
  body("title" || "amount" || "description" || "category" || "date")
    .notEmpty()
    .withMessage("All fields are required"),
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ min: 3, max: 32 })
    .withMessage("Title should contain at least 3 to maximum 32 character"),
  body("amount")
    .trim()
    .notEmpty()
    .withMessage("Amount is required")
    .isNumeric()
    .withMessage("Amount should be a number")
    .isLength({ min: 1, max: 32 })
    .withMessage("Price should contain at least 1 to maximum 32 number"),
  body("description")
    .trim()
    .notEmpty()
    .withMessage("Description is required"),
  body("category")
    .trim()
    .notEmpty()
    .withMessage("Category is required"),
  body("date")
    .trim()
    .notEmpty()
    .withMessage("Date is also required")
];

// module export
module.exports = {
    createIncomeValidation
}