const express = require("express");
const expenseRouter = express.Router();
const expenseController = require("../controllers/expenseController");
const prisma = require("../utils/db/prismaClient");
const { deleteModel } = require("mongoose");

expenseRouter.get("/", (req, res) => {
  res.send(req.user);
});

expenseRouter.post("/addExpense", async (req, res) => {
  const expense = req.body;

  try {
    const expenseData = await prisma.expense.create({
      data: {
        userId: req.user.id,
        amount: Number(expense.amount),
        category: expense.category,
        description: expense.description,
        frequency: expense.frequency,
        targetDate: expense.targetDate,
      },
    });
    return res.status(200).json({
      status: "success",
      message: "New Expense Created",
      data: expenseData,
    });
  } catch (error) {
    return res
      .status(400)
      .json({ status: "failed", message: "Internal Error" });
  }
});

expenseRouter.put("/updateExpense/:id", async (req, res) => {
  const expenseId = req.params.id;
  const expense = req.body;
  try {
    const updateExpense = await prisma.expense.update({
      where: {
        id: expenseId,
      },
      data: {
        amount: Number(expense.amount) || undefined,
        category: expense.category || undefined,
        description: expense.description || undefined,
        frequency: expense.frequency || undefined,
        targetDate: expense.targetDate || undefined,
      },
    });

    return res.status(200).json({
      status: "success",
      message: "Expense Updated",
      data: updateExpense,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ status: "failed", message: "Internal Error" });
  }
});

expenseRouter.delete("/deleteExpense/:id", async (req, res) => {
  const expenseId = req.params.id;
  try {
    const deleteExpense = await prisma.expense.delete({
      where: {
        id: expenseId,
      },
    });

    console.log(deleteExpense);

    return res.status(200).json({
      status: "success",
      message: "Expense Delete",
      data: deleteExpense.id,
    });
  } catch (error) {
    return res
      .status(400)
      .json({ status: "failed", message: "Internal Error" });
  }
});

//Income
//added category

expenseRouter.post("/addIncome", async (req, res) => {
  const expense = req.body;

  try {
    const incomeData = await prisma.income.create({
      data: {
        userId: req.user.id,
        amount: Number(expense.amount),
        category: expense.category,
        description: expense.description,
        category: expense.category,
        frequency: expense.frequency,
        targetDate: expense.targetDate

      },
    });
    return res.status(200).json({
      status: "success",
      message: "New Income Created",
      data: incomeData,
    });
  } catch (error) {
    return res
      .status(400)
      .json({ status: "failed", message: "Internal Error" });
  }
});

expenseRouter.put("/updateIncome/:id", async (req, res) => {
  const expenseId = req.params.id;
  const expense = req.body;
  try {
    const updateIncome = await prisma.income.update({
      where: {
        id: expenseId,
      },
      data: {
        amount: Number(expense.amount) || undefined,
        category: expense.category || undefined,
        description: expense.description || undefined,
        frequency: expense.frequency || undefined,
        targetDate: expense.targetDate || undefined,
      },
    });
    return res.status(200).json({
      status: "success",
      message: "Income Updated",
      data: updateIncome,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ status: "failed", message: "Internal Error" });
  }
});

expenseRouter.delete("/deleteIncome/:id", async (req, res) => {
  const expenseId = req.params.id;

  try {
    const deleteIncome = await prisma.income.delete({
      where: {
        id: expenseId,
      },
    });
    return res
      .status(200)
      .json({ status: "success", message: "Income Delete", data: data.id });
  } catch (error) {
    return res
      .status(400)
      .json({ status: "failed", message: "Internal Error" });
  }
});
// Saving
expenseRouter.post("/addSaving", async (req, res) => {
  const saving = req.body;

  try {
    const savingData = await prisma.saving.create({
      data: {
        userId: req.user.id,
        amount: Number(saving.amount),
        category: saving.category,
        description: saving.description,
        frequency: saving.frequency,
        targetDate: saving.targetDate,
      },
    });
  } catch (error) {
    return res
      .status(400)
      .json({ status: "failed", message: "Internal Error", data: savingData });
  }

  return res
    .status(200)
    .json({ status: "success", message: "New Saving Goal Created" });
});

expenseRouter.put("/updateSaving/:id", async (req, res) => {
  const savingId = req.params.id;
  const saving = req.body;
  try {
    const updateIncome = await prisma.saving.update({
      where: {
        id: savingId,
      },
      data: {
        amount: Number(saving.amount) || undefined,
        category: saving.category || undefined,
        description: saving.description || undefined,
        frequency: saving.frequency || undefined,
        targetDate: saving.targetDate || undefined,
      },
    });
    return res.status(200).json({
      status: "success",
      message: "Saving Updated",
      data: updateIncome,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ status: "failed", message: "Internal Error" });
  }
});

expenseRouter.delete("/deleteSaving/:id", async (req, res) => {
  const savingId = req.params.id;

  try {
    const deleteIncome = await prisma.saving.delete({
      where: {
        id: savingId,
      },
    });
    return res.status(200).json({
      status: "success",
      message: "Saving Delete",
      data: deleteIncome.id,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ status: "failed", message: "Internal Error" });
  }
});

module.exports = expenseRouter;
