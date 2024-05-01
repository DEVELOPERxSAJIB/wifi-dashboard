const createError = require("http-errors");
const { successResponse, errorResponse } = require("./responseController");
const {
  cloudUploadAvatar,
  cloudUploadDocumnets,
  cloudDeleteAvatar,
  cloudUserDocsDelete,
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
    const { role } = req.query;
    let query = null;

    if (role === "admin") {
      query = null;
    } else if (role === "staff") {
      query = { role: "staff" };
    } else {
      return errorResponse(res, {
        statusCode: 400,
        message: "Invalid role specified",
      });
    }

    const user = await User.find(query)
      .sort({ createdAt: -1 })
      .select("-password")
      .populate("addedBy");

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
        totalUser: user.length,
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
    const { _id } = req.user;

    const {
      name,
      email,
      mobile,
      password,
      role,
      salary,
      gender,
      remark,
      street,
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

    // avatar upload
    let avatar = null;
    if (req.files) {
      const data = req.files?.userAvatar?.[0];
      if (data) {
        avatar = await cloudUploadAvatar(data);
      }
    }

    // documents upload
    let uploadedDocuements = null;
    if (req.files) {
      const doc = req.files?.userDocuments;
      if (doc) {
        uploadedDocuements = await cloudUploadDocumnets(doc);
      }
    }

    // separate data from uploaded docuements
    const documents = uploadedDocuements
      ? uploadedDocuements.map((file) => ({
          public_id: file.public_id,
          url: file.secure_url.replace("/upload/", "/upload/f_auto,q_auto/"),
        }))
      : [];

    // password hash
    const hashPass = await bcrypt.hash(password, 10);

    const data = {
      name,
      email,
      mobile,
      salary,
      role,
      gender,
      remark,
      addedBy: _id,
      password: hashPass,
      address: {
        street,
        city,
        postalCode,
        country,
      },
      avatar: {
        public_id: avatar ? avatar?.public_id : null,
        url: avatar ? avatar?.secure_url : null,
      },
      documents,
    };

    // create new user
    let user = await User.create(data);
    const addedByUser = await User.findById(user?._id).populate("addedBy");

    if (addedByUser?.addedBy?.role == "admin") {
      user = await User.findByIdAndUpdate(
        user?._id,
        {
          isActivate: true,
        },
        { new: true }
      );
    }

    successResponse(res, {
      statusCode: 200,
      message: `Profile successfull created for ${name}`,
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

    const user = await User.findById(id);

    if (!user) {
      throw createError("Invalid User id provided");
    }

    // delete avatar
    if (user?.avatar?.public_id) {
      await cloudDeleteAvatar(user?.avatar?.public_id);
    }

    // delete documents
    const public_ids = [];
    user.documents.forEach((doc) => {
      public_ids.push(doc.public_id);
    });
    await cloudUserDocsDelete(public_ids);

    const deletedUser = await User.findByIdAndDelete(id);

    successResponse(res, {
      statusCode: 200,
      message: "User deleted successfully",
      payload: {
        user: deletedUser,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @DESC Update User
 * @ROUTE /api/v1/user/:id
 * @method PUT/PATCH
 * @access private
 */
const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      name,
      email,
      role,
      mobile,
      gender,
      salary,
      remark,
      street,
      city,
      postalCode,
      country,
      password,
      confirmPassword,
    } = req.body;

    // exist user check
    const existingUserWithEmail = await User.findOne({ email });
    if (existingUserWithEmail && existingUserWithEmail._id.toString() !== id) {
      throw new Error("Email already in use for another user");
    }

    // exist user check
    const existingUserWithMobile = await User.findOne({ mobile });
    if (
      existingUserWithMobile &&
      existingUserWithMobile._id.toString() !== id
    ) {
      throw new Error("Mobile number already in use");
    }

    if (password !== confirmPassword) {
      throw new Error("Confirm password does not match");
    }

    const updateUser = await User.findById(id);

    let avatar = null;
    if (req.files && req.files.userAvatar && req.files.userAvatar.length > 0) {
      const data = req.files.userAvatar[0];
      if (data) {
        // delete previous avatar
        await cloudDeleteAvatar(updateUser?.avatar?.public_id);

        // upload new avatar
        avatar = await cloudUploadAvatar(data);
      }
    }

    // documents upload
    let uploadedDocuments = null;
    if (
      req.files &&
      req.files.userDocuments &&
      req.files.userDocuments.length > 0
    ) {
      const doc = req.files.userDocuments;

      if (doc) {
        // delete documents
        const public_ids = updateUser.documents.map((doc) => doc.public_id);
        await cloudUserDocsDelete(public_ids);

        // upload new docs
        uploadedDocuments = await cloudUploadDocumnets(doc);
      }
    }

    // separate data from uploaded documents
    let documents = [];
    uploadedDocuments?.length > 0 &&
      uploadedDocuments?.map((file) => {
        documents.push({
          public_id: file.public_id,
          url: file.secure_url.replace("/upload/", "/upload/f_auto,q_auto/"),
        });
      });

    // make password hash
    const hashedPassword = password
      ? await bcrypt.hash(password, 10)
      : updateUser.password;

    const user = await User.findByIdAndUpdate(
      id,
      {
        name,
        email,
        role,
        mobile,
        gender,
        salary,
        remark,
        password: hashedPassword,
        address: {
          street,
          city,
          postalCode,
          country,
        },
        avatar: {
          public_id: avatar ? avatar.public_id : updateUser.avatar.public_id,
          url: avatar ? avatar.secure_url : updateUser.avatar.url,
        },
        documents: documents.length > 0 ? documents : updateUser?.documents,
      },
      { new: true }
    );

    successResponse(res, {
      statusCode: 200,
      message: `Profile successfully updated for ${user.name}`,
      payload: {
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @DESC Update User Ban Status
 * @ROUTE /api/v1/user/ban-user/:id
 * @method PUT
 * @access private
 */
const banUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    const { isBan, name } = user;

    const userBanStatusUpdate = await User.findByIdAndUpdate(
      id,
      {
        isBan: !isBan,
      },
      { new: true }
    );

    const msg = userBanStatusUpdate?.isBan
      ? `${name} is banned successfully`
      : `${name} unban successfully`;

    successResponse(res, {
      statusCode: 200,
      message: msg,
      payload: {
        user: userBanStatusUpdate,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @DESC Update User isActivate Status
 * @ROUTE /api/v1/user/active-user/:id
 * @method PUT
 * @access private
 */
const activeUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { active } = req.body;

    const user = await User.findById(id);

    const { name } = user;

    const userActiveStatusUpdate = await User.findByIdAndUpdate(
      id,
      {
        isActivate: active,
      },
      { new: true }
    );

    const msg = `${name}'s account is activated`;

    successResponse(res, {
      statusCode: 200,
      message: msg,
      payload: {
        user: userActiveStatusUpdate,
      },
    });
  } catch (error) {
    next(error);
  }
};

// module export
module.exports = {
  getAllUsers,
  createUser,
  deleteUser,
  updateUser,
  banUser,
  activeUser,
};
