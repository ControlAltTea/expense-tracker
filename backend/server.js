const express = require("express");
const morgan = require("morgan");

const app = express();

app.get("/", (req, res) => {
  res.send("Testing").status(200);
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is Listening to ${process.env.PORT}`);
});
