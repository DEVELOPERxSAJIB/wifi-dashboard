const createError = require("http-errors");
const Customer = require("../models/Customer");
const { cloudUploadAvatar, cloudDeleteAvatar } = require("../utils/cloudinary");
const { successResponse } = require("./responseController");

/**
 * @DESC get all customers
 * @ROUTE /api/v1/customer
 * @method GET
 * @access PRIVATE
 */
const getAllCustomer = async (req, res, next) => {
  try {
    const customer = await Customer.find().populate("package");

    if (customer.length <= 0) {
      throw createError(400, "No customers found");
    }

    successResponse(res, {
      statusCode: 200,
      message: "Plan created successfully",
      payload: {
        customer,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @DESC Create a new customer
 * @ROUTE /api/v1/customer/create-customer
 * @method POST
 * @access PRIVATE
 */
const createCustomer = async (req, res, next) => {
  try {
    const { name, mobile, remark, street, city, postalCode, country, package } =
      req.body;

    // icon uploding to cloud storage
    let avatar = null;
    if (req.file) {
      avatar = await cloudUploadAvatar(req.file);
    }

    // exist plan check
    const existingPlan = await Customer.findOne({ mobile });
    if (existingPlan) {
      throw createError(
        400,
        "You can't add multiple customer with same phone number"
      );
    }

    const data = {
      name,
      mobile,
      remark,
      package,
      address: {
        street,
        city,
        postalCode,
        country,
      },
      image: {
        public_id: avatar?.public_id,
        url: avatar?.secure_url,
      },
    };

    // create new plan
    const newCustomer = await Customer.create(data);

    // return result
    successResponse(res, {
      statusCode: 200,
      message: "A New Customer Added",
      payload: {
        customer: newCustomer,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @DESC Update plan
 * @ROUTE /api/v1/plans/update-plan
 * @method PUT
 * @access PRIVATE
 */
const updateCustomer = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, mobile, remark, package, street, city, postalCode, country } =
      req.body;

    // exist customer check
    const existingCustomer = await Customer.findById(id);
    if (!existingCustomer) {
      throw createError(400, "Customer with this details not found");
    }

    // icon uploding to cloud storage
    let avatar = null;
    if (req.file) {
      const public_id = existingCustomer.image?.public_id;
      if (public_id) {
        await cloudDeleteAvatar(public_id);
      }
      avatar = await cloudUploadAvatar(req.file);
    }

    // update existing customer
    const updatedCustomer = await Customer.findByIdAndUpdate(
      id,
      {
        name,
        mobile,
        remark,
        package,
        street,
        city,
        postalCode,
        country,
        image: {
          public_id: avatar ? avatar?.public_id : existingCustomer.image.public_id,
          url: avatar ? avatar?.secure_url : existingCustomer?.image.url,
        },
      },
      { new: true }
    );

    // return result
    successResponse(res, {
      statusCode: 200,
      message: "Customer details updated",
      payload: {
        customer : updatedCustomer,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @DESC Delete customer
 * @ROUTE /api/v1/customer/delete-customer
 * @method DELETE
 * @access PRIVATE
 */
const deleteCustomer = async (req, res, next) => {
  try {
    const { id } = req.params;

    // exist plan check
    const existingCustomer = await Customer.findById(id);
    if (!existingCustomer) {
      throw createError(400, "No plan found");
    }

    // delete plan icon
    if (existingCustomer?.image?.url !== null) {
      await cloudDeleteAvatar(existingCustomer?.image?.public_id);
    }

    // create new plan
    const deletedCustomer = await Customer.findByIdAndDelete(id);

    // return result
    successResponse(res, {
      statusCode: 200,
      message: "Customer deleted successfully",
      payload: {
        customer: deletedCustomer,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllCustomer,
  createCustomer,
  deleteCustomer,
  updateCustomer,
};
