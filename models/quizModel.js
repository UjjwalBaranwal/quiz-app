const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  questionList: [
    {
      question_num: Number,
      question: String,
      options: {},
    },
  ],

  answer_list: {},
  createdBy: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
  isPublish: {
    type: Boolean,
    default: false,
  },
  quizTime: {
    type: Number,
    default: 30,
  },
});

const Quiz = new mongoose.model("Quiz", quizSchema);

module.exports = Quiz;
