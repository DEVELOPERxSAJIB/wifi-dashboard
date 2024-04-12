require("colors");
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoBDConnect = require("./config/db.js");
const createError = require("http-errors");
const rateLimit = require("express-rate-limit");
const userRouter = require("./route/userRouter.js");
const { errorResponse } = require("./controllers/responseController.js");
const planRouter = require("./route/planRouter.js");

// initialization
const app = express();
dotenv.config();

// limit response in specific time
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 mnt
  limit: 100,
  message: "Too many requests from this IP. Try again later",
});

// set middlewares
app.use(limiter);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:5173"],
    credentials: true,
  })
);

// set environment vars
const PORT = process.env.PORT || 9090;

// static folder
app.use(express.static("public"));

// routing
app.use("/api/v1/user", userRouter);
app.use("/api/v1/plan", planRouter);

// client error handling
app.use((req, res, next) => {
  next(createError(404, "Router Not Found"));
});

// server error handling -> all the errors
app.use((err, req, res, next) => {
  return errorResponse(res, {
    statusCode: err.status,
    message: err.message,
  });
});

// app listen
app.listen(PORT, () => {
  mongoBDConnect();
  console.log(`server is running on port ${PORT}`.bgGreen.black);
});
