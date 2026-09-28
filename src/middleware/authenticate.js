const jwt = require("jsonwebtoken");
const { store } = require("../data/store");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");

module.exports = catchAsync(async (req, res, next) => {
  // 1. Get token from header
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(new AppError("Authentication required. Please log in.", 401));
  }

  const token = authHeader.split(" ")[1];

  // 2. Verify token
  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return next(new AppError("Invalid or expired token", 401));
  }

  // 3. Find user
  const user = store.users.find((u) => u.id === decoded.id);
  if (!user) {
    return next(new AppError("User no longer exists", 401));
  }

  // 4. Attach user (minus password) to request
  req.user = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };

  next();
});