const AppError = require("../utils/AppError");
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

exports.validateTeacher = (req, res, next) => {
  const { name, email, phone, subject } = req.body;

  if (!name || !email || !phone || !subject) {
    return next(
      new AppError("Name, email, phone, and subject are required", 400)
    );
  }

  if (!EMAIL_REGEX.test(email)) {
    return next(new AppError("Invalid email format", 400));
  }

  next();
};