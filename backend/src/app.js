const morgan = require("morgan");
const express = require("express");
const passport = require("./utils/passport");
const app = express();
const cors = require("cors");
const loginRouter = require("./routes/loginRouter");
const registerRouter = require("./routes/registerRouter");
const dashBoardRouter = require("./routes/dashboardRouter");
const expenseRouter = require("./routes/expenseRouter");

const middleware = require("./middlewares/middleware");

if (process.env.NODE_ENV === "development") {
  app.use(morgan("tiny"));
}

app.use(express.static("dist"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(middleware.requestLogger);
app.use(passport.initialize());

app.use("/api/login", loginRouter);
app.use("/api/register", registerRouter);

// add middleware auth once dashboard is finished
if (process.env.NODE_ENV === "development") {
  app.use(
    "/api/dashboard",
    passport.authenticate("jwt", { session: false }),
    dashBoardRouter
  );
  app.use(
    "/api/expense",
    passport.authenticate("jwt", { session: false }),
    expenseRouter
  );
}

app.get(
  "/test",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log(req.user);
    res.json({ message: "authorized User" });
  }
);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
