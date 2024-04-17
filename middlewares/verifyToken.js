const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/User.js");

const tokenVerify = (req, res, next) => {
  const accessToken = req.cookies.accessToken;

  if (!accessToken) {
    return res.status(400).json({ message: "Unauthorized" });
  }

  jwt.verify(
    accessToken,
    process.env.ACCESS_TOKEN_SECRET,
    asyncHandler(async (err, decode) => {
      if (err) {
        return res.status(400).json({ message: "Invalid Token" });
      }

      const user = await User.findOne({ email: decode.email }).select(
        "-password"
      );

      req.user = user;
      next();
    })
  );
};

module.exports = tokenVerify;
