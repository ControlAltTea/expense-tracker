const morgan = require("morgan");
const express = require("express");
const app = express();
const cors = require("cors");
const loginRouter = require("./routes/loginRouter");
const middleware = require("./middlewares/middleware");

if (process.env.NODE_ENV === "development") {
  app.use(morgan("tiny"));
  console.log("testing");
}

app.use(express.static("dist"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(middleware.requestLogger);

app.use("/api/login", loginRouter);

app.get("/test", (req, res) => {
  console.log("test");
});

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
