const { body } = require("express-validator");

const loginAuthValidation = [
  body("email" || "password")
    .notEmpty()
    .withMessage("All fields are required"),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please enter a valid email address")
    .isLength({ min: 5, max: 40 })
    .withMessage("Email should contain at least 5 to maximum 40 character"),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password should contain at least 6 character"),
];

// module export
module.exports = {
    loginAuthValidation,
};
