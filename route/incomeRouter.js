const express = require("express");
const runValidation = require("../validators");
const tokenVerify = require("../middlewares/verifyToken");
const {
  createIncome,
  getAllIncome,
  deleteIncome,
} = require("../controllers/incomeController");
const { createIncomeValidation } = require("../validators/finance");

// init router
const incomeRouter = express.Router();

// use verify token
incomeRouter.use(tokenVerify);

// create route
incomeRouter.route("/").get(getAllIncome);
incomeRouter
  .route("/create-income")
  .post(createIncomeValidation, runValidation, createIncome);
incomeRouter.route("/delete-income/:id").delete(deleteIncome);

// module default router
module.exports = incomeRouter;
