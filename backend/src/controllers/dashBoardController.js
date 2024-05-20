const prisma = require("../utils/db/prismaClient");

exports.getUser = async (req, res) => {
  try {
    const userData = await prisma.user.findUnique({
      where: {
        id: req.user.id,
      },
      select: {
        id: true,
        Income: {
          select: {
            amount: true,
            category: true,
            description: true,
            targetDate: true,
            frequency: true,
          },
        },
        Saving: {
          select: {
            amount: true,
            targetDate: true,
            description: true,
          },
        },
        Expense: {
          select: {
            amount: true,
            category: true,
            description: true,
            targetDate: true,
            frequency: true,
          },
        },
      },
    });

    return res
      .status(200)
      .json({ status: "success", message: "Data Fetched", data: userData });
  } catch (error) {
    console.error(error);
    return res
      .status(400)
      .json({ status: "failed", message: "Internal Error" });
  }
};
