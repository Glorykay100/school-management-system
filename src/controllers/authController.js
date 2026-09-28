const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { store, nextId } = require("../data/store");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");

// ---------- REGISTER ----------
exports.register = catchAsync(async (req, res) => {
  const { name, email, password, role } = req.body;

  // Check for duplicate email
  if (store.users.find((u) => u.email === email)) {
    throw new AppError("Email already registered", 409);
  }

  const hashedPassword = await bcrypt.hash(
    password,
    Number(process.env.BCRYPT_SALT_ROUNDS) || 10
  );

  const user = {
    id: nextId(store.users),
    name,
    email,
    password: hashedPassword,
    role,
    createdAt: new Date().toISOString(),
  };

  store.users.push(user);

  res.status(201).json({
    success: true,
    message: "User registered successfully",
    data: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});

// ---------- LOGIN ----------
exports.login = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  const user = store.users.find((u) => u.email === email);
  if (!user) throw new AppError("Invalid credentials", 401);

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new AppError("Invalid credentials", 401);

  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "1h" }
  );

  res.status(200).json({
    success: true,
    message: "Login successful",
    token,
    data: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});