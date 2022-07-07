import type { NextApiHandler } from "next";
import prisma from "../../libs/prisma";

const handler: NextApiHandler = async (req, res) => {
  switch (req.method) {
    case "POST":
      try {
        const todo = await prisma.todo.create({
          data: { ...req.body, updatedAt: new Date() },
        });
        res.status(201).send(todo);
      } catch (error) {
        console.log(error);
        res.status(500).json(error);
      }
      break;
    case "GET":
      try {
        const todos = await prisma.todo.findMany();
        res.status(200).json(todos);
      } catch (error) {
        console.log(error);
        res.status(500).json(error);
      }
      break;
    default:
      res.status(415).json({ message: "invalid http method." });
      break;
  }
};

export default handler;
