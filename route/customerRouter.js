const express = require("express");
const tokenVerify = require("../middlewares/verifyToken");
const {
  createCustomer,
  getAllCustomer,
  deleteCustomer,
  updateCustomer,
} = require("../controllers/customerController");
const { customerPicture } = require("../utils/multer");
const runValidation = require("../validators");
const { createCustomerValidation } = require("../validators/customer");

// init router
const customerRouter = express.Router();

// use verify token
customerRouter.use(tokenVerify);

// create route
customerRouter.route("/").get(getAllCustomer);
customerRouter
  .route("/create-customer")
  .post(
    customerPicture,
    createCustomerValidation,
    runValidation,
    createCustomer
  );
customerRouter.route("/delete-customer/:id").delete(deleteCustomer)
customerRouter.route("/update-customer/:id").put(customerPicture, updateCustomer)

// module default router
module.exports = customerRouter;
