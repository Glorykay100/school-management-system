const { store, nextId } = require("../data/store");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");
const { calculateGrade } = require("../utils/gradeCalculator");

exports.createResult = catchAsync(async (req, res) => {
  const { studentId, subjectId, score, term, session } = req.body;

  // Validate references
  if (!store.students.find((s) => s.id === studentId)) {
    throw new AppError("Student not found", 404);
  }
  if (!store.subjects.find((s) => s.id === subjectId)) {
    throw new AppError("Subject not found", 404);
  }

  const result = {
    id: nextId(store.results),
    studentId,
    subjectId,
    score,
    grade: calculateGrade(score),
    term,
    session,
    createdAt: new Date().toISOString(),
  };

  store.results.push(result);

  res.status(201).json({
    success: true,
    message: "Result created successfully",
    data: result,
  });
});

exports.getAllResults = catchAsync(async (req, res) => {
  // Students can only see their own results
  if (req.user.role === "student") {
    const ownResults = store.results.filter(
      (r) => r.studentId === req.user.id
    );
    return res.status(200).json({
      success: true,
      count: ownResults.length,
      data: ownResults,
    });
  }

  res.status(200).json({
    success: true,
    count: store.results.length,
    data: store.results,
  });
});

exports.getResultById = catchAsync(async (req, res) => {
  const id = Number(req.params.id);
  const result = store.results.find((r) => r.id === id);
  if (!result) throw new AppError("Result not found", 404);

  if (req.user.role === "student" && result.studentId !== req.user.id) {
    throw new AppError("You can only view your own results", 403);
  }

  res.status(200).json({ success: true, data: result });
});

exports.updateResult = catchAsync(async (req, res) => {
  const id = Number(req.params.id);
  const result = store.results.find((r) => r.id === id);
  if (!result) throw new AppError("Result not found", 404);

  const { score, term, session } = req.body;
  if (score !== undefined) {
    if (typeof score !== "number" || score < 0 || score > 100) {
      throw new AppError("Score must be between 0 and 100", 400);
    }
    result.score = score;
    result.grade = calculateGrade(score);
  }
  if (term) result.term = term;
  if (session) result.session = session;

  res.status(200).json({
    success: true,
    message: "Result updated successfully",
    data: result,
  });
});

exports.deleteResult = catchAsync(async (req, res) => {
  const id = Number(req.params.id);
  const index = store.results.findIndex((r) => r.id === id);
  if (index === -1) throw new AppError("Result not found", 404);

  store.results.splice(index, 1);
  res.status(204).send();
});