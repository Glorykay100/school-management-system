const AppError = require("../utils/AppError");

exports.validateResult = (req, res, next) => {
  const { studentId, subjectId, score, term, session } = req.body;

  if (!studentId || !subjectId || score === undefined || !term || !session) {
    return next(
      new AppError(
        "studentId, subjectId, score, term, and session are required",
        400
      )
    );
  }

  if (typeof score !== "number" || score < 0 || score > 100) {
    return next(new AppError("Score must be a number between 0 and 100", 400));
  }

  next();
};