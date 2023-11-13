const morgan = require("morgan");
const express = require("express");

const app = express();

const contactRouter = require("./routes/contactRoute");
const quizRouter = require("./routes/quizRoute");
/// 1) MIDDLEWARE
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json()); //middleWare
//////////////////////////////////////////////////////////////////////
/////////// Creating our own middleWare function
app.use((req, res, next) => {
  console.log("hello from the middleware 😎");
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use("/api/v1/contact", contactRouter);
app.use("/api/v1/quiz", quizRouter);

module.exports = app;
