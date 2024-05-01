const Income = require("../models/Income");
const { successResponse } = require("./responseController");

/**
 * @DESC Get All Income
 * @ROUTE api/v1/income
 * @method GET
 * @access PRIVATE
 */
const getAllIncome = async (req, res, next) => {
  try {

    const income = await Income.find();

    successResponse(res, {
      statusCode: 200,
      message: "Fetch all income",
      payload: {
        income: income,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @DESC Create Income
 * @ROUTE api/v1/income/ceate-income
 * @method POST
 * @access PRIVATE
 */
const createIncome = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { title, amount, description, date, category, user } = req.body;

    const data = {
      title,
      amount,
      description,
      date,
      category,
      user: id,
    };

    const income = await Income.create(data);

    successResponse(res, {
      statusCode: 200,
      message: "A New Income Added",
      payload: {
        income: income,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @DESC Delete Income
 * @ROUTE api/v1/income/delete-income
 * @method DELETE
 * @access PRIVATE
 */
const deleteIncome = async (req, res, next) => {
  try {
    const { id } = req.params;

    const income = await Income.findByIdAndDelete(id);

    successResponse(res, {
      statusCode: 200,
      message: "Income deleted",
      payload: {
        income: income,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllIncome,
  createIncome,
  deleteIncome,
};
