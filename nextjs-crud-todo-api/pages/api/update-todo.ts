import type { NextApiHandler } from "next";
import prisma from "../../libs/prisma";

const handler: NextApiHandler = async (req, res) => {
  if (!req.body.id) {
    res.status(400).send("Bad Request. need id!");
    return;
  }
  try {
    await prisma.todo.update({
      data: { ...req.body, updatedAt: new Date() },
      where: { id: req.body.id },
    });
    res.status(200).send("ok");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

export default handler;
