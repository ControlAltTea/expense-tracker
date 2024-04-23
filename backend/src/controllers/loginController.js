//loginController.js

exports.getUser = async (req, res, next) => {
  console.log("check");
  res.send("Get User endPoint").status(200);
};
