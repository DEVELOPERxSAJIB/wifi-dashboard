const createError = require("http-errors");
const Plan = require("../models/Plan");
const { successResponse } = require("./responseController");
const { planIconUpload, planIconDelete } = require("../utils/cloudinary");

/**
 * @DESC Get all plans
 * @ROUTE /api/v1/plans
 * @method GET
 * @access PUBLIC
 */
const getAllPlans = async (req, res, next) => {
  try {
    const plan = await Plan.find();

    if (plan.length <= 0) {
      throw createError(400, "No plans found");
    }

    successResponse(res, {
      statusCode: 200,
      message: "All plans found",
      payload: {
        plan,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @DESC Create a new plan
 * @ROUTE /api/v1/plans/create-plan
 * @method POST
 * @access PRIVATE
 */
const createPlan = async (req, res, next) => {
  try {
    const { name, price, badge, mbps } = req.body;

    // icon uploding to cloud storage
    let icon = null;
    if (req.file) {
      icon = await planIconUpload(req.file);
    }

    // exist plan check
    const existingPlan = await Plan.findOne({ name });
    if (existingPlan) {
      throw createError(400, "This plan already exists");
    }

    // create new plan
    const plan = await Plan.create({
      name: name,
      price: price,
      badge: badge,
      mbps: mbps,
      icon: {
        public_id: icon?.public_id,
        url: icon?.url,
      },
    });

    // return result
    successResponse(res, {
      statusCode: 200,
      message: "Plan created successfully",
      payload: {
        plan,
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
const updatePlan = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, price, badge, mbps } = req.body;

    // exist plan check
    const existingPlan = await Plan.findById(id);
    if (!existingPlan) {
      throw createError(400, "No plan found");
    }

    // icon uploding to cloud storage
    let icon = null;
    if (req.file) {
      const public_id = existingPlan.icon.public_id;
      await planIconDelete(public_id);
      icon = await planIconUpload(req.file);
    }

    // update existing plan
    const plan = await Plan.findByIdAndUpdate(id, {
      name: name,
      price: price,
      badge: badge,
      mbps: mbps,
      icon: {
        public_id: icon ? icon?.public_id : existingPlan.icon.public_id,
        url: icon ? icon?.url : existingPlan.icon.url,
      },
    });

    // return result
    successResponse(res, {
      statusCode: 200,
      message: "Plan updated successfully",
      payload: {
        plan,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @DESC delete plan
 * @ROUTE /api/v1/plans/delete-plan
 * @method DELETE
 * @access PRIVATE
 */
const deletePlan = async (req, res, next) => {
  try {
    const { id } = req.params;

    // exist plan check
    const existingPlan = await Plan.findById(id);
    if (!existingPlan) {
      throw createError(400, "No plan found");
    }

    // delete plan icon
    if (existingPlan.icon === Object) {
      await planIconDelete(existingPlan?.icon?.public_id);
    }

    // delete plan
    const plan = await Plan.findByIdAndDelete(id);

    // return result
    successResponse(res, {
      statusCode: 200,
      message: "Plan successfully deleted",
      payload: {
        plan,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllPlans,
  createPlan,
  updatePlan,
  deletePlan,
};
