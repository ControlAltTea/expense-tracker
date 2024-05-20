const bycrpyt = require("bcryptjs");
const prisma = require("../utils/db/prismaClient");
const passwordRequirement = require("../utils/passwordRequirement");

exports.test = (req, res) => {
  console.log("testing");
  console.log(req.userToken);
  res.send("tesing");
};

exports.createUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    const user = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    if (user)
      return res
        .status(400)
        .json({ status: "failed", message: "Email already exist" });

    if (!passwordRequirement(password))
      return res
        .status(400)
        .json({ status: "failed", message: "Password Critera Not Met" });

    try {
      const hashedPassword = await bycrpyt.hash(password, 10);
      console.log(hashedPassword);

      await prisma.user.create({
        data: {
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: hashedPassword,
        },
      });

      return res
        .status(201)
        .json({ status: "success", message: "User created Successfully" });
    } catch (error) {
      console.error("Error creating User");
      res.status(500).json({ status: "failed", message: "Internal Error" });
      console.log(error);
    }
  } catch (error) {
    return res
      .status(500)
      .json({ status: "failed", message: "Internal Error" });
  }
};
