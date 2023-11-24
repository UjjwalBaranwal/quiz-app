const Quiz = require("./../models/quizModel");
const catchAsync = require("./../utils/catchAsync");
const appError = require("./../utils/appError");
const { decode } = require("jsonwebtoken");
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
    const newQuiz = await Quiz.create({ ...req.body, createdBy: req.user.id });
    // newQuiz.createdBy = req.user.id;
    // newQuiz.save();
    console.log(req.user.id);
    res.status(201).json({
      status: "success",
      data: {
        quiz: newQuiz,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      status: "fail",
      message: err,
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

  // Fetch the quiz based on the quizId
  const quiz = await Quiz.findById(quizId);

  // Check if the quiz exists
  if (!quiz) {
    return next(new appError("Quiz not found", 404));
  }

  // Delete the quiz from the database

  await Quiz.deleteOne({ _id: quizId });

  res.status(200).json({
    status: "success",
    data: {
      quiz, // You might want to include the deleted quiz in the response
    },
  });
});

exports.publishQuiz = catchAsync(async (req, res, next) => {
  const quizId = req.body.quizId;
  const quiz = await Quiz.findById(quizId);
  if (!quiz) {
    return next(new appError("cannnot find the quiz", 404));
  }
  quiz.isPublish = true;
  quiz.save();
  res.status(200).json({
    status: "success",
    message: "quiz is successfully published",
    data: {
      quizId,
    },
  });
});
