/**
 * Custom error handler
 * @param {*} error
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const errorHandler = (error, req, res, next) => {
  const status = res.statusCode ? res.statusCode : 500;
  res.status(status).json({ message: error.message });
};

module.exports = errorHandler;