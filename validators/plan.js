const { body } = require("express-validator");

const createPlanValidation = [
  body("name" || "price" || "mbps")
    .notEmpty()
    .withMessage("All fields are required"),
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 3, max: 32 })
    .withMessage("Name should contain at least 3 to maximum 32 character"),
  body("price")
    .trim()
    .notEmpty()
    .withMessage("Price is required")
    .isNumeric()
    .withMessage("Price should be a number")
    .isLength({ min: 0, max: 32 })
    .withMessage("Price should contain at least 1 to maximum 32 character"),
  body("mbps")
    .trim()
    .notEmpty()
    .withMessage("Data speed is required (mbps)")
    .isLength({ min: 0, max: 32 })
    .withMessage("Price should contain at least 1 to maximum 32 character"),
];

// module export
module.exports = {
    createPlanValidation
}