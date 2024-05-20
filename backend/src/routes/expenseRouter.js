const express = require("express");
const expenseRouter = express.Router();
const expenseController = require("../controllers/expenseController");

expenseRouter.post("/addSaving", (req, res) => {
  console.log("Testing");
});

module.exports = expenseRouter;
