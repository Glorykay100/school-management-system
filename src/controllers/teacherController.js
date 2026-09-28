const { store, nextId } = require("../data/store");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");

exports.createTeacher = catchAsync(async (req, res) => {
  const { name, email, phone, subject } = req.body;

  if (store.teachers.find((t) => t.email === email)) {
    throw new AppError("Teacher with this email already exists", 409);
  }

  const teacher = {
    id: nextId(store.teachers),
    name,
    email,
    phone,
    subject,
    createdAt: new Date().toISOString(),
  };

  store.teachers.push(teacher);

  res.status(201).json({
    success: true,
    message: "Teacher created successfully",
    data: teacher,
  });
});

exports.getAllTeachers = catchAsync(async (req, res) => {
  res.status(200).json({
    success: true,
    count: store.teachers.length,
    data: store.teachers,
  });
});

exports.getTeacherById = catchAsync(async (req, res) => {
  const id = Number(req.params.id);
  const teacher = store.teachers.find((t) => t.id === id);
  if (!teacher) throw new AppError("Teacher not found", 404);

  res.status(200).json({ success: true, data: teacher });
});

exports.updateTeacher = catchAsync(async (req, res) => {
  const id = Number(req.params.id);
  const teacher = store.teachers.find((t) => t.id === id);
  if (!teacher) throw new AppError("Teacher not found", 404);

  const { name, email, phone, subject } = req.body;
  if (name) teacher.name = name;
  if (email) teacher.email = email;
  if (phone) teacher.phone = phone;
  if (subject) teacher.subject = subject;

  res.status(200).json({
    success: true,
    message: "Teacher updated successfully",
    data: teacher,
  });
});

exports.deleteTeacher = catchAsync(async (req, res) => {
  const id = Number(req.params.id);
  const index = store.teachers.findIndex((t) => t.id === id);
  if (index === -1) throw new AppError("Teacher not found", 404);

  store.teachers.splice(index, 1);
  res.status(204).send();
});