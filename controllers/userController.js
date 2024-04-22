const createError = require("http-errors");
const { successResponse, errorResponse } = require("./responseController");
const {
  cloudUploadAvatar,
  cloudUploadDocumnets,
} = require("../utils/cloudinary");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

/**
 * @DESC Get all users
 * @ROUTE /api/v1/user
 * @method GET
 * @access PRIVATE
 */
const getAllUsers = async (req, res, next) => {
  try {
    const user = await User.find().sort({ createdAt: -1 });

    if (user.length == 0) {
      return errorResponse(res, {
        statusCode: 404,
        message: "Users not found",
      });
    }

    successResponse(res, {
      statusCode: 200,
      message: "All users found",
      payload: {
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @DESC Create new User
 * @ROUTE /api/v1/user/create-user
 * @method POST
 * @access PRIVATE
 */
const createUser = async (req, res, next) => {
  try {
    const {
      name,
      email,
      mobile,
      password,
      salary,
      gender,
      remark,
      street,
      province,
      city,
      postalCode,
      country,
    } = req.body;

    // check user email
    const userEmailCheck = await User.findOne({ email });
    if (userEmailCheck) {
      throw createError(400, "User with this email already exists");
    }

    // check user mobile
    const userMobileCheck = await User.findOne({ mobile });
    if (userMobileCheck) {
      throw createError(400, "User with this mobile already exists");
    }

    let avatar = null;
    let uploadedDocuements = null;

    if (req.files) {
      // avatar upload
      const data = req.files?.userAvatar[0];
      if (data) {
        avatar = await cloudUploadAvatar(data);
      }

      // documents upload
      const doc = req.files?.userDocuments;
      console.log("pc files",doc);
      if (doc) {
        uploadedDocuements = await cloudUploadDocumnets(doc);
      }
    }

    // separate data from uploaded docuements
    let documents = [];
    if (uploadedDocuements) {
      uploadedDocuements.forEach((file) => {
        documents.push({
          public_id: file?.public_id,
          url: file?.secure_url,
        });
      });
    }

    // password hash
    const hashPass = await bcrypt.hash(password, 10);

    const data = {
      name,
      email,
      mobile,
      salary,
      gender,
      remark,
      password: hashPass,
      address: {
        street,
        province,
        city,
        postalCode,
        country,
      },
      avatar: {
        public_id: avatar ? avatar?.public_id : null,
        url: avatar ? avatar?.secure_url : null,
      },
      documents: documents.length > 0 ? documents : uploadedDocuements,
    };

    // create new user
    const user = await User.create(data);

    successResponse(res, {
      statusCode: 200,
      message: `Profile successfull created for "${name}"`,
      payload: {
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @DESC Delete User
 * @ROUTE /api/v1/user/:id
 * @method DELETE
 * @access PRIVATE
 */
const deleteUser = async (req, res, error) => {
  try {
    const { id } = req.params;

    if (!id) {
      throw createError("Invalid id provided");
    }

    const user = await User.findByIdAndDelete(id);

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

// /**
//  * @DESC Update User
//  * @ROUTE /api/v1/user/:id
//  * @method PUT/PATCH
//  * @access public
//  */
// export const updateUser = asyncHandler(async (req, res) => {
//   const { id } = req.params;

//   const { name, email, mobile, password, gender } = req.body;

//   if (!name || !email || !mobile || !password || !gender) {
//     return res.status(400).json({ message: "All fields are required" });
//   }

//   const user = await User.findByIdAndUpdate(
//     id,
//     {
//       name,
//       email,
//       mobile,
//       password,
//       gender,
//     },
//     { new: true }
//   );

//   res.status(200).json(user);
// });

// module export
module.exports = {
  getAllUsers,
  createUser,
  deleteUser,
};
