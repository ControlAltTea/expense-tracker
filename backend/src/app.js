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

const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

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

app.post("/api/openAi", async (req, res) => {
  if (!req.body || req.body.question.length < 1) {
    return res.status(400).json("No Body");
  }

  let prompt = req.body.question;

  console.log(prompt);
  try {
    const chatCompletion = await openai.chat.completions.create({
      messages: [{ role: "assistant", content: prompt }],
      model: "gpt-3.5-turbo",
      max_tokens: 150,
    });

    const message = chatCompletion.choices[0].message.content;
    console.log(message);

    return res.status(200).json(message);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error });
  }
});

// add middleware auth once dashboard is finished

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

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
