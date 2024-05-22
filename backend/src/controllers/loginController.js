//loginController.js
const prisma = require("../utils/db/prismaClient");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findFirstOrThrow({
      where: {
        email: email,
      },
    });

    let passwordCorrect = await bcrypt.compare(password, user.password);
    console.log(email, password);
    if (!passwordCorrect) {
      return res
        .status(401)
        .json({ status: "failed", message: "Invaldid User or Password" });
    }

    const userToken = {
      email: user.email,
      id: user.id,
      name: `${user.firstName} ${user.lastName}`,
    };

    const token = jwt.sign(userToken, "process.env.SECRET_KEY", {
      expiresIn: "1h",
    });

    return res.status(200).json({
      token: token,
      status: "success",
      message: "Login Successful",
      user: userToken,
    });
  } catch (error) {
    return (error.code = "P205"
      ? res
          .status(401)
          .json({ status: "failed", message: "Invalid User or Password" })
      : res.status(500).json({ status: "failed", message: "Internal Error" }));
  }
};
