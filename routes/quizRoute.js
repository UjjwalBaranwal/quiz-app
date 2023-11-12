const express = require("express");
const router = express.Router();

//create quiz
router.post("/", (req, res) => {
  console.log("quiz created");
});

//get quiz
router.get("/:quizId", (req, res) => {
  console.log("get quized");
});

// update quiz
router.put("/", (req, res) => {
  console.log("quiz updated");
});

//delete quiz

router.delete("/:quizId", (req, res) => {
  console.log("quiz deleted");
});

// publish quiz
