const express = require("express");
const { getAllUsers, createUser, deleteUser } = require("../controllers/userController");
const { createUserValidation } = require("../validators/user");
const runValidation = require("../validators");
const { fileUploader } = require("../utils/multer");

// init router
const userRouter = express.Router();

// use verify token
// router.use(tokenVerify);

// create route
userRouter.route("/").get(getAllUsers);
userRouter.route("/:id").delete(deleteUser);
userRouter
  .route("/create-user")
  .post(fileUploader, createUserValidation, runValidation, createUser);

// module default router
module.exports = userRouter;
