const { body } = require("express-validator");

const createUserValidation = [
  body("name" || "email" || "mobile" || "password" || "salary" || "address")
    .notEmpty()
    .withMessage("All fields are required"),
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 3, max: 32 })
    .withMessage("Name should contain at least 3 to maximum 32 character"),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please enter a valid email address")
    .isLength({ min: 5, max: 40 })
    .withMessage("Email should contain at least 5 to maximum 40 character"),
  body("mobile")
    .trim()
    .notEmpty()
    .withMessage("Phone number is required")
    .isNumeric()
    .withMessage("Please enter a valid phone number")
    .isLength({ min: 11 })
    .withMessage("Phone should contain at least 11 character"),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password should contain at least 6 character"),
  body("salary")
    .trim()
    .notEmpty()
    .withMessage("Salary is required")
    .isNumeric()
    .withMessage("Salary should contain number only"),
  body("street")
    .trim()
    .notEmpty()
    .withMessage("Street is required"),
  body("city")
    .trim()
    .notEmpty()
    .withMessage("City is required")
];

// module export
module.exports = {
    createUserValidation
}