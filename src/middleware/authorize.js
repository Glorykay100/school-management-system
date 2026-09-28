const AppError = require("../utils/AppError");

// Usage: authorize("admin"), authorize("admin", "teacher")
module.exports = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(new AppError("Authentication required", 401));
    }

    if (!allowedRoles.includes(req.user.role)) {
      return next(
        new AppError("Forbidden: You don't have permission for this action", 403)
      );
    }

    next();
  };
};