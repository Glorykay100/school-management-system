const { store, nextId } = require("../data/store");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");

exports.createStudent = catchAsync(async (req, res) => {
  const { name, email, phone, class: className } = req.body;

  if (store.students.find((s) => s.email === email)) {
    throw new AppError("Student with this email already exists", 409);
  }

  const student = {
    id: nextId(store.students),
    name,
    email,
    phone,
    class: className,
    createdAt: new Date().toISOString(),
  };

  store.students.push(student);

  res.status(201).json({
    success: true,
    message: "Student created successfully",
    data: student,
  });
});

exports.getAllStudents = catchAsync(async (req, res) => {
  res.status(200).json({
    success: true,
    count: store.students.length,
    data: store.students,
  });
});

exports.getStudentById = catchAsync(async (req, res) => {
  const id = Number(req.params.id);

  // Students can only view their own profile
  if (req.user.role === "student" && req.user.id !== id) {
    throw new AppError("You can only view your own profile", 403);
  }

  const student = store.students.find((s) => s.id === id);
  if (!student) throw new AppError("Student not found", 404);

  res.status(200).json({ success: true, data: student });
});

exports.updateStudent = catchAsync(async (req, res) => {
  const id = Number(req.params.id);
  const student = store.students.find((s) => s.id === id);
  if (!student) throw new AppError("Student not found", 404);

  const { name, email, phone, class: className } = req.body;
  if (name) student.name = name;
  if (email) student.email = email;
  if (phone) student.phone = phone;
  if (className) student.class = className;

  res.status(200).json({
    success: true,
    message: "Student updated successfully",
    data: student,
  });
});

exports.deleteStudent = catchAsync(async (req, res) => {
  const id = Number(req.params.id);
  const index = store.students.findIndex((s) => s.id === id);
  if (index === -1) throw new AppError("Student not found", 404);

  store.students.splice(index, 1);
  res.status(204).send();
});