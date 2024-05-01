const express = require("express");
const {
  getAllUsers,
  createUser,
  deleteUser,
  updateUser,
  banUser,
  activeUser,
} = require("../controllers/userController");
const { createUserValidation } = require("../validators/user");
const runValidation = require("../validators");
const { fileUploader } = require("../utils/multer");
const tokenVerify = require("../middlewares/verifyToken");

// init router
const userRouter = express.Router();

// use verify token
userRouter.use(tokenVerify);

// create route
userRouter
  .route("/create-user")
  .post(fileUploader, createUserValidation, runValidation, createUser);
userRouter.route("/").get(getAllUsers);
userRouter.route("/update-user/:id").put(fileUploader, updateUser);
userRouter.route("/ban-user/:id").put(banUser);
userRouter.route("/active-user/:id").put(activeUser);
userRouter.route("/:id").delete(deleteUser);

// module default router
module.exports = userRouter;
