const AppError = require("../utils/AppError");

exports.validateClass = (req, res, next) => {
  const { name, level } = req.body;

  if (!name || !level) {
    return next(new AppError("Class name and level are required", 400));
  }

  next();
};