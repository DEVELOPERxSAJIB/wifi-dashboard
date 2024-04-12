const express = require("express");
const { getAllUsers } = require("../controllers/userController")

// init router
const userRouter = express.Router();

// use verify token
// router.use(tokenVerify);

// create route
userRouter.route("/").get(getAllUsers)

// module default router
module.exports = userRouter;
