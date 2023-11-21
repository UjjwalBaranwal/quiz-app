const morgan = require("morgan");
const express = require("express");

const app = express();

const AppError = require("./utils/appError");
const globalErrorHandler = require("./controller/errorController");
const contactRouter = require("./routes/contactRoute");
const quizRouter = require("./routes/quizRoute");
const userRouter = require("./routes/userRouter");
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
app.use("/api/v1/user", userRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`can't find the ${req.originalUrl}`, 404));
});
app.use(globalErrorHandler);

module.exports = app;
