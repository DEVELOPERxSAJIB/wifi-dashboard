const createError = require("http-errors");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { successResponse } = require("./responseController");
const {
  replaceDotWithHeypen,
  replaceHeypenWithDot,
} = require("../helpers/bothAccessAbleToken");
const emailWithNodemailer = require("../utils/sendEmail");

/**
 * @DESC User Login
 * @ROUTE /api/v1/auth/login
 * @method POST
 * @access public
 */
const authLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // find login user by email
    const loginUser = await User.findOne({ email });

    // user not found
    if (!loginUser) {
      throw createError(404, "Invalid email or password");
    }

    // password check
    const passwordCheck = await bcrypt.compare(password, loginUser.password);

    // password check
    if (!passwordCheck) {
      throw createError(404, "Invalid email or password");
    }

    const user = await User.findOne({ email }).select("-password");

    // create access token
    const token = jwt.sign(
      { email: user.email },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRE_IN,
      }
    );

    res.cookie("accessToken", token, {
      httpOnly: true,
      secure: process.env.APP_ENV == "Development" ? false : true,
      sameSite: "strict",
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    successResponse(res, {
      statusCode: 200,
      message: "User Login Successful",
      payload: {
        token,
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @DESC User Logout
 * @ROUTE /api/v1/auth/logout
 * @method POST
 * @access public
 */
const authLogout = async (req, res, next) => {
  try {
    res.clearCookie("accessToken");

    successResponse(res, {
      statusCode: 200,
      message: "User Logout Successful",
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @DESC LoggedIn User Data
 * @ROUTE /api/v1/auth/user
 * @method GET
 * @access public
 */
const loggedInUser = async (req, res, next) => {
  try {
    return successResponse(res, {
      statusCode: 200,
      message: "Logged in user details",
      payload: { user: req.user },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @DESC Update Password
 * @ROUTE api/v1/auth/update-password
 * @method PATCH
 * @access PRIVATE
 */
const updatePassword = async (req, res, next) => {
  try {
    const id = req.user._id;
    const { oldPassword, newPassword, confirmNewPassword } = req.body;

    if (!oldPassword || !newPassword || !confirmNewPassword) {
      throw createError(400, "All feilds are required");
    }

    const user = await User.findById(id);

    // check previous user password
    const isPasswordMatch = bcrypt.compareSync(oldPassword, user.password);

    if (!isPasswordMatch) {
      throw createError(400, "Old password mismatch");
    }

    if (newPassword !== confirmNewPassword) {
      throw createError(400, "Confirm password not matched");
    }

    const hashPassword = await bcrypt.hash(newPassword, 10);

    const updatedPassUser = await User.findByIdAndUpdate(
      id,
      {
        password: hashPassword,
      },
      { new: true }
    ).select("-password");

    res.clearCookie("accessToken", null, {
      httpOnly: true,
    });

    successResponse(res, {
      success: true,
      message: "Password updated successfully. Please login again",
      payload: {
        user: updatedPassUser,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @DESC Forget Password
 * @ROUTE api/v1/auth/forget-password
 * @method POST
 * @access PUBLIC
 */
const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    // if existing user not found
    if (!user) {
      throw createError(404, "No such user registred with this email yet");
    }

    const token = jwt.sign({ email }, process.env.JWT_RESET_PASSWORD_KEY, {
      expiresIn: "15m",
    });

    // make token accessable
    const acceptableTokenForClient = replaceDotWithHeypen(token);

    // gen link
    const link = `${process.env.CLIENT_URL}/reset-password/${acceptableTokenForClient}`;

    // prepare for sent email
    const emailOptions = {
      email: user.email,
      subject: "Reset your password",
      html: `
        <a href=${link}>Click Here<a/> to reset your password
      `,
    };

    // send email with nodemailer
    await emailWithNodemailer(emailOptions);

    successResponse(res, {
      statusCode: 200,
      message: `A reset password link was sent to ${user.email}. Please check`,
      payload: { token: acceptableTokenForClient },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @DESC Reset the password
 * @ROUTE api/v1/auth/reset-password/:token
 * @method PATCH
 * @access PRIVATE
 */
const resetPassword = async (req, res, next) => {
  try {
    const { token, password, confirmPassword } = req.body;
    const serverAcceptableToken = replaceHeypenWithDot(token);

    const decoded = jwt.verify(
      serverAcceptableToken,
      process.env.JWT_RESET_PASSWORD_KEY
    );

    const user = await User.findOne({
      email: decoded.email,
    });

    if (!user) {
      throw createError(404, "User not found for reset Password");
    }

    if (password !== confirmPassword) {
      throw createError(400, "Confirm password not matched");
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const userAfterResetPass = await User.findByIdAndUpdate(
      user._id,
      {
        password: hashPassword,
      },
      { new: true }
    ).select("-password");

    successResponse(res, {
      statusCode: 200,
      message: "Password reset successfully. Please login here!!!",
      payload: {
        user: userAfterResetPass,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  authLogin,
  authLogout,
  loggedInUser,
  updatePassword,
  forgotPassword,
  resetPassword,
};
