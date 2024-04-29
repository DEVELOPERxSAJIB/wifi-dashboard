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
const { cloudDeleteAvatar, cloudUploadAvatar } = require("../utils/cloudinary");

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

    if (!user.isActivate) {
      if (res.cookie) {
        res.clearCookie("accessToken");
      }
      throw createError(404, "Your account is not activated yet");
    }

    if (user.isBan) {
      if (res.cookie) {
        res.clearCookie("accessToken");
      }
      throw createError(
        404,
        "Unfortunately your account is Banned. Please talk to our suppor system"
      );
    }

    // create access token
    const aToken = jwt.sign(
      { email: user.email },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRE_IN,
      }
    );

    res.cookie("accessToken", aToken, {
      httpOnly: true,
      secure: process.env.MODE == "Development" ? false : true,
      sameSite: "strict",
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    successResponse(res, {
      statusCode: 200,
      message: "User Login Successful",
      payload: {
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
 * @DESC Update User Data
 * @ROUTE /api/v1/auth/update-user
 * @method PUT
 * @access private
 */
const updateAuthUser = async (req, res, next) => {
  try {
    const {
      name,
      email,
      mobile,
      salary,
      gender,
      street,
      city,
      postalCode,
      country,
    } = req.body;

    const existingUser = await User.findById(req.user._id);
    if (!existingUser) {
      throw createError(400, "User not found");
    }

    let avatar = null;
    if (req.file) {
      const public_id = existingUser.avatar?.public_id;
      if (public_id) {
        await cloudDeleteAvatar(public_id);
      }
      avatar = await cloudUploadAvatar(req.file);
    }

    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        name,
        email,
        mobile,
        salary,
        gender,
        avatar: {
          public_id: avatar?.public_id
            ? avatar?.public_id
            : existingUser?.avatar?.public_id,
          url: avatar?.secure_url
            ? avatar?.secure_url
            : existingUser?.avatar.url,
        },
        address: {
          street,
          city,
          postalCode,
          country,
        },
      },
      { new: true }
    ).select("-password");

    successResponse(res, {
      statusCode: 200,
      message: "Your profile updated successfully",
      payload: { user },
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

    if (!email) {
      throw createError(400, "Email is required");
    }

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
    const link = `${process.env.CLIENT_URL}/request-reset-password/${acceptableTokenForClient}`;

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
      message: `Check your inbox and follow the instructions to reset your password.`,
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

    if (!token || !password || !confirmPassword) {
      throw createError(400, "All feilds are required");
    }

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
  updateAuthUser,
};
