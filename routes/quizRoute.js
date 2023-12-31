const express = require("express");
const quizController = require("./../controller/quizController");
const authController = require("./../controller/authController");
const router = express.Router();

router
  .route("/")
  .get(authController.protect, quizController.getAllQuiz)
  .post(authController.protect, quizController.createQuiz)
  .put(authController.protect, quizController.updateQuiz);

router
  .route("/:quizId")
  .get(authController.protect, quizController.getQuiz)
  .delete(authController.protect, quizController.deleteQuiz);

router
  .route("/publish")
  .patch(authController.protect, quizController.publishQuiz);

module.exports = router;

// //create quiz
// router.post("/", (req, res) => {
//   console.log("quiz created");
//   res.send("quiz created");
// });

// //get quiz
// router.get("/:quizId", (req, res) => {
//   console.log("get quized");
//   res.send("get quized");
// });
// // update quiz
// router.put("/", (req, res) => {
//   console.log("quiz updated");
//   res.send("quiz updated");
// });

// //delete quiz

// router.delete("/:quizId", (req, res) => {
//   console.log("quiz deleted");
//   res.send("quiz deleted");
// });
// // publish quiz
// // patch
// router.patch("/publish", (req, res) => {
//   console.log("Published");
//   res.send("Published");
// });
