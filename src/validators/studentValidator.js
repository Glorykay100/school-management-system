const AppError = require("../utils/AppError");
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

exports.validateStudent = (req, res, next) => {
  const { name, email, phone, class: className } = req.body;

  if (!name || !email || !phone || !className) {
    return next(
      new AppError("Name, email, phone, and class are required", 400)
    );
  }

  if (!EMAIL_REGEX.test(email)) {
    return next(new AppError("Invalid email format", 400));
  }

  next();
};