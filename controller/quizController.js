const Quiz = require("./../models/quizModel");
const catchAsync = require("./../utils/catchAsync");
const appError = require("./../utils/appError");
exports.getAllQuiz = catchAsync(async (req, res, next) => {
  const quizs = await Quiz.find();
  if (!quizs) {
    return next(new appError("can not find data from the DB", 404));
  }
  // send response
  res.status(200).json({
    status: "success",
    requestAt: req.requestTime,
    result: quizs.length,
    data: {
      quizs,
    },
  });
});

exports.createQuiz = async (req, res) => {
  try {
    const newQuiz = await Quiz.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        quiz: newQuiz,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: "err",
    });
  }
};

exports.getQuiz = catchAsync(async (req, res, next) => {
  const quizId = req.params.quizId;
  const quiz = await Quiz.findById(quizId, {
    name: 1,
    questionList: 1,
    answer_list: 1,
  });
  if (!quiz) {
    return next(new appError("quiz is not found", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      quizId: quiz._id,
      quiz,
    },
  });
});

exports.updateQuiz = catchAsync(async (req, res, next) => {
  const quizId = req.body._id;
  const quiz = await Quiz.findById(quizId);
  if (!quiz) {
    // console.log(quiz);
    return next(new appError("quiz is not found", 404));
  }
  // quiz.name = req.body.name;
  quiz.questionList = req.body.questionList;
  quiz.answer_list = req.body.answer_list;
  await quiz.save();
  res.status(200).json({
    status: "success",
    data: {
      quiz,
    },
  });
});

exports.deleteQuiz = catchAsync(async (req, res, next) => {
  const quizId = req.params.quizId;
  if (!quiz) {
    // console.log(quiz);
    return next(new appError("quiz is not found", 404));
  }
  await Quiz.deleteOne({ _id: quizId });
});

exports.publishQuiz = async (req, res) => {
  try {
    res.status(200).json({
      status: "success",
      data: {
        contact,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: "err",
    });
  }
};
