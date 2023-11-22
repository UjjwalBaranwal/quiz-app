const { promisify } = require("util"); // builtin util module for promising... extracting promisify from the util
const User = require("./../models/userModel");
const catchAsync = require("./../utils/catchAsync");
const jwt = require("jsonwebtoken");
const AppError = require("./../utils/appError");
const sendEmail = require("./../utils/email");
const crypto = require("crypto"); //built-in module for generating token

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};
exports.signUp = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    changedPasswordAt: req.body.changedPasswordAt,
    role: req.body.role,
  });
  const token = signToken(newUser._id);

  res.status(201).json({
    status: "success",
    token,
    data: {
      newUser,
    },
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError("please provide email or password", 400));
  }

  const user = await User.findOne({ email }).select("+password");
  console.log(user);
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Email id or Password is incorrect"), 401);
  }
  const token = signToken(user._id);
  res.status(200).json({
    status: "success",
    token,
  });
});

/// creating protect middle ware for the protected routes

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  /////// 1 get the token and checking it exist
  // we always send token in header name -- 'authorization' and the its value always start with -- 'Bearer' .. its just a common proceddure
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
    // above code is because headers authorization looks like ..... authorization : 'Bearer jlsdfj;alkd' so splits it on the basis of spaces and the take the value at one position for the value of token
  }
  console.log("token :", token);
  if (!token) {
    return next(new AppError("invalid token... you are not logged in", 401));
  }
  //////  2 varification token

  // .verify send promise
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  console.log(decoded);
  /////   3 check if user exist
  const freshUser = await User.findById(decoded.id);
  if (!freshUser)
    return next(new AppError("token belonging to the user doesnot exist", 401));
  /////   4 if user change password after the token is issued
  //// note:- currently this function is not working ........ isko future mai shi krna hai
  if (await freshUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError("User currently changed password . please log in again", 401)
    );
  }
  // grant access to the protected route
  req.user = freshUser;
  next();
});

/// creating restric middleware
exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    // roles = ['admin','lead-guide'] let current login user has role==='user'. So this user is not a role in roles array so this user donot have a permission to pass in the next function
    if (!roles.includes(req.user.role))
      return next(new AppError("you dont have a permission do to this", 403));
  };
  next();
};

//// creating forgot password
exports.forgotPassword = catchAsync(async (req, res, next) => {
  // steps
  console.log("i am clicked");
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError("There is no user with email address.", 404));
  }

  const resetToken = user.createPasswordResetToken();
  console.log({ resetToken });
  await user.save({ validateBeforeSave: false });
  // 3) send its to user Email
  const resetURL = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/users/resetPassword/${resetToken}`;
  const message = `Forgot your password ? submit a new password and confirm password here ${resetURL}\n if you did not forgot your password ignore this message`;
  try {
    await sendEmail({
      email: user.email,
      subject: "your reset password token only valid for only 10 min ",
      message,
    });
    res.status(200).json({
      status: "success",
      message: "token sent to mail",
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpire = undefined;
    await user.save({ validateBeforeSave: false });
    console.log(err);
    return next(new AppError("Error in sending Email . try again", 500));
  }

  // next();
});
//// creating reset password
exports.resetPassword = catchAsync(async (req, res, next) => {
  //steps
  // 1) get user based on token
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpire: { $gt: Date.now() },
  });
  // 2) if token is not expired and their is a user . set new password
  if (!user) {
    console.log(user);
    return next(new AppError("user is not found or the token is expired", 400));
  }
  user.password = req.body.password;
  user.confirmPassword = req.body.confirmPassword;
  user.passwordResetToken = undefined;
  user.passwordResetExpire = undefined;
  // 3) update changed password property for the user
  await user.save();
  // 4) log the user in , basically send JWT to client
  const token = signToken(user._id);
  res.status(200).json({
    status: "success",
    token,
  });

  // next();
});
