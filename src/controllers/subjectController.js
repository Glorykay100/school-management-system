const { store, nextId } = require("../data/store");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");

exports.createSubject = catchAsync(async (req, res) => {
  const { name, code } = req.body;

  const subject = {
    id: nextId(store.subjects),
    name,
    code,
    createdAt: new Date().toISOString(),
  };

  store.subjects.push(subject);

  res.status(201).json({
    success: true,
    message: "Subject created successfully",
    data: subject,
  });
});

exports.getAllSubjects = catchAsync(async (req, res) => {
  res.status(200).json({
    success: true,
    count: store.subjects.length,
    data: store.subjects,
  });
});

exports.getSubjectById = catchAsync(async (req, res) => {
  const id = Number(req.params.id);
  const subject = store.subjects.find((s) => s.id === id);
  if (!subject) throw new AppError("Subject not found", 404);

  res.status(200).json({ success: true, data: subject });
});

exports.updateSubject = catchAsync(async (req, res) => {
  const id = Number(req.params.id);
  const subject = store.subjects.find((s) => s.id === id);
  if (!subject) throw new AppError("Subject not found", 404);

  const { name, code } = req.body;
  if (name) subject.name = name;
  if (code) subject.code = code;

  res.status(200).json({
    success: true,
    message: "Subject updated successfully",
    data: subject,
  });
});

exports.deleteSubject = catchAsync(async (req, res) => {
  const id = Number(req.params.id);
  const index = store.subjects.findIndex((s) => s.id === id);
  if (index === -1) throw new AppError("Subject not found", 404);

  store.subjects.splice(index, 1);
  res.status(204).send();
});