const { body } = require("express-validator");

const createCustomerValidation = [
  body("name" || "mobile" || "package" || "street" || "city")
    .notEmpty()
    .withMessage("All fields are required"),
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 3, max: 32 })
    .withMessage("Name should contain at least 3 to maximum 32 character"),
  body("mobile").trim().notEmpty().withMessage("Phone number is required"),
  body("package").trim().notEmpty().withMessage("Please select a package"),
  body("street").trim().notEmpty().withMessage("Street address required"),
  body("city").trim().notEmpty().withMessage("City name required"),
];

// module export
module.exports = {
  createCustomerValidation,
};
