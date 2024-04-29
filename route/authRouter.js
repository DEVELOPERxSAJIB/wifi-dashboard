const express = require("express");
const {
  authLogin,
  authLogout,
  loggedInUser,
  updatePassword,
  forgotPassword,
  resetPassword,
  updateAuthUser,
} = require("../controllers/authController");
const { loginAuthValidation } = require("../validators/auth");
const runValidation = require("../validators");
const tokenVerify = require("../middlewares/verifyToken");
const { userAvatar } = require("../utils/multer");

// init router
const authRouter = express.Router();

// create route
authRouter.route("/login").post(loginAuthValidation, runValidation, authLogin);
authRouter.route("/logout").post(authLogout);
authRouter.route("/me").get(tokenVerify, loggedInUser);
authRouter
  .route("/update-auth-user")
  .put(userAvatar, tokenVerify, updateAuthUser);
authRouter.route("/update-password").patch(tokenVerify, updatePassword);
authRouter.route("/forgot-password").post(forgotPassword);
authRouter.route("/reset-password").patch(resetPassword);

// export default router
module.exports = authRouter;
