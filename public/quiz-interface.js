const QuizData = [
  {
    question: "Q1: Which is the purpose of JavaScript?",
    a: "To style HTML Pages",
    b: "To add interactivity to HTML pages",
    c: "To perform server side scripting operations",
    d: "for adding tags",
    ans: "ans2",
  },
  {
    question:
      "Q2: To insert a JavaScript into an HTML page, which tag is used?",
    a: "script='java'",
    b: "javascript",
    c: "script",
    d: "link",
    ans: "ans3",
  },
  {
    question:
      "Q3: Which of the following is correct to write “Hello World” on the web page?",
    a: "print('Hello World')",
    b: "document.write('Hello World')",
    c: "response.write('Hello World')",
    d: "generate.write('Hello World')",
    ans: "ans2",
  },
];

// let timer = false;

const start = document.getElementById("startbtn");

start.addEventListener("click", () => {
  document.querySelector(".start-container").style.display = "none";
  document.querySelector(".quiz-container").style.display = "flex";
  countdown(0, 0, 2);
});

const timeline = document.querySelector(".time-line");
const timeText = document.querySelector(".time-box .time-text");
const hours = document.querySelector(".time-box #hour");
const mins = document.querySelector(".time-box #min");
const secs = document.querySelector(".time-box #sec");

function countdown(hr, mm, ss) {
  var interval = setInterval(function () {
    if (ss == 0) {
      if (mm != 0) {
        ss = 59;
        mm--;
      }
      if (mm == 0 && hr != 0) {
        mm = 59;
        ss = 59;
        hr--;
      }
      if (mm == 0 && hr == 0) {
        clearInterval(interval);
        quiz.innerHTML = `
                    <section class="result">
                        <h1>YOUR RESULT</h1>
                        <div class="image">
                            <img src="img/congo.png" alt="" srcset="" class="img">
                        </div>
                        <h2>Congratulations!!!</h2>
                        <h3>you socred : ${score} / ${QuizData.length} </h3>
                        
                        <button class="btn" onclick="location.reload()"> Restart Quiz </button>
                    </section>
                    `;
      }
    } else {
      ss--;
    }
    if (hr.toString().length < 2) hr = "0" + hr;
    if (mm.toString().length < 2) mm = "0" + mm;
    if (ss.toString().length < 2) ss = "0" + ss;
    secs.innerHTML = ss;
    mins.innerHTML = mm;
    hours.innerHTML = hr;
  }, 1000);
}

const quiz = document.querySelector(".quiz");

const question = document.querySelector(".question");

const option1 = document.querySelector(".option1");
const option2 = document.querySelector(".option2");
const option3 = document.querySelector(".option3");
const option4 = document.querySelector(".option4");

const answers = document.querySelectorAll(".answer");
const submit = document.querySelector("#submit");

let questionCount = 0;
let score = 0;

const loadQuestion = () => {
  question.innerHTML = QuizData[questionCount].question;
  option1.innerHTML = QuizData[questionCount].a;
  option2.innerHTML = QuizData[questionCount].b;
  option3.innerHTML = QuizData[questionCount].c;
  option4.innerHTML = QuizData[questionCount].d;
};

loadQuestion();

submit.addEventListener("click", () => {
  const CheckAnswer = () => {
    let answer;
    answers.forEach((cur) => {
      if (cur.checked) {
        answer = cur.id;
      }
    });
    return answer;
  };
  if (CheckAnswer() === QuizData[questionCount].ans) {
    score++;
  }

  if (questionCount < QuizData.length - 2) {
    submit.innerHTML = "<p>Next</p>";
  } else {
    submit.innerHTML = '<p style="font-weight: 1000; ">Finish</p>';
  }

  questionCount++;

  answers.forEach((item) => (item.checked = false));

  if (questionCount < QuizData.length) {
    loadQuestion();
  } else {
    quiz.innerHTML = `
        <section class="result">
            <h1>YOUR RESULT</h1>
            <div class="image">
                <img src="img/congo.png" alt="" srcset="" class="img">
            </div>
            <h2>Congratulations!!!</h2>
            <h3>you socred : ${score} / ${QuizData.length} </h3>
            
            <button class="btn" onclick="location.reload()"> Restart Quiz </button>
        </section>
        `;
  }
});
