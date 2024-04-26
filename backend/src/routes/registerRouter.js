const express = require("express");
const registerRouter = express.Router();
const registerController = require("../controllers/registerController");

registerRouter.get("/", registerController.test);

registerRouter.post("/", registerController.createUser);

module.exports = registerRouter;
