const express = require("express");
const {
  getAllPlans,
  createPlan,
  deletePlan,
  updatePlan,
  getSinglePlan,
} = require("../controllers/planController");
const runValidation = require("../validators");
const { planIcon } = require("../utils/multer");
const { createPlanValidation } = require("../validators/plan");

// init router
const planRouter = express.Router();

// use verify token
// router.use(tokenVerify);

// create route
planRouter.route("/").get(getAllPlans);
planRouter.route("/:id").get(getSinglePlan);
planRouter
  .route("/create-plan")
  .post(planIcon, createPlanValidation, runValidation, createPlan);
planRouter.route("/update-plan/:id").put(planIcon, updatePlan);
planRouter.route("/delete-plan/:id").delete(deletePlan);

// module default router
module.exports = planRouter;
