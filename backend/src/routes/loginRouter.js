const express = require("express");
const loginRouter = express.Router();
const loginController = require("../controllers/loginController");

loginRouter.get("/", loginController.getUser);

module.exports = loginRouter;
