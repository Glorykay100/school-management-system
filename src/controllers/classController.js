const { store, nextId } = require("../data/store");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");

exports.createClass = catchAsync(async (req, res) => {
  const { name, level } = req.body;

  const newClass = {
    id: nextId(store.classes),
    name,
    level,
    createdAt: new Date().toISOString(),
  };

  store.classes.push(newClass);

  res.status(201).json({
    success: true,
    message: "Class created successfully",
    data: newClass,
  });
});

exports.getAllClasses = catchAsync(async (req, res) => {
  res.status(200).json({
    success: true,
    count: store.classes.length,
    data: store.classes,
  });
});

exports.getClassById = catchAsync(async (req, res) => {
  const id = Number(req.params.id);
  const cls = store.classes.find((c) => c.id === id);
  if (!cls) throw new AppError("Class not found", 404);

  res.status(200).json({ success: true, data: cls });
});

exports.updateClass = catchAsync(async (req, res) => {
  const id = Number(req.params.id);
  const cls = store.classes.find((c) => c.id === id);
  if (!cls) throw new AppError("Class not found", 404);

  const { name, level } = req.body;
  if (name) cls.name = name;
  if (level) cls.level = level;

  res.status(200).json({
    success: true,
    message: "Class updated successfully",
    data: cls,
  });
});

exports.deleteClass = catchAsync(async (req, res) => {
  const id = Number(req.params.id);
  const index = store.classes.findIndex((c) => c.id === id);
  if (index === -1) throw new AppError("Class not found", 404);

  store.classes.splice(index, 1);
  res.status(204).send();
});