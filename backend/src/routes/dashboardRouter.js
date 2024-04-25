const express = require("express");
const dashBoardRouter = express.Router();
const dashBoardController = require("../controllers/dashBoardController");

dashBoardRouter.get("/", dashBoardController.getUser);

module.exports = dashBoardRouter;
