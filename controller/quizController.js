const Quiz = require("./../models/quizModel");

exports.getAllQuiz = async (req, res) => {
  try {
    const quizs = await Quiz.find();
    // send response
    res.status(200).json({
      status: "success",
      requestAt: req.requestTime,
      result: quizs.length,
      data: {
        quizs,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: "err",
    });
  }
};

exports.createQuiz = async (req, res) => {
  try {
    const newQuiz = await Quiz.create(req.body);

    res.status(200).json({
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

exports.getQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.param.quizId);

    res.status(200).json({
      status: "success",
      data: {
        quiz,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: "err",
    });
  }
};

exports.updateQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findByIdAndUpdate(req.param.quizId, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: "success",
      data: {
        quiz,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: "err",
    });
  }
};

exports.deleteQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findByIdAndDelete(req.param.quizId);

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: "err",
    });
  }
};

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
