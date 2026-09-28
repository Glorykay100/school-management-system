const AppError = require("../utils/AppError");

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PUBLIC_REGISTRATION_ROLE = "student";

exports.validateRegister = (req, res, next) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password || !role) {
    return next(new AppError("Name, email, password, and role are required", 400));
  }

  if (!EMAIL_REGEX.test(email)) {
    return next(new AppError("Invalid email format", 400));
  }

  if (password.length < 6) {
    return next(new AppError("Password must be at least 6 characters", 400));
  }

  if (role !== PUBLIC_REGISTRATION_ROLE) {
    return next(new AppError("Public registration is limited to students", 400));
  }

  next();
};

exports.validateLogin = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError("Email and password are required", 400));
  }

  if (!EMAIL_REGEX.test(email)) {
    return next(new AppError("Invalid email format", 400));
  }

  next();
};