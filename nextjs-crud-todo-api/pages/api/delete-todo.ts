import type { NextApiHandler } from "next";
import prisma from "../../libs/prisma";

const handler: NextApiHandler = async (req, res) => {
  try {
    await prisma.todo.delete({ where: { id: req.body.id } });
    res.status(200).send("ok");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

export default handler;
