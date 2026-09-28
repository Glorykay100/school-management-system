const AppError = require("../utils/AppError");

exports.validateSubject = (req, res, next) => {
  const { name, code } = req.body;

  if (!name || !code) {
    return next(new AppError("Subject name and code are required", 400));
  }

  next();
};