import { NextApiHandler } from "next";
import prisma from "../../../libs/prisma";

const handler: NextApiHandler = async (req, res) => {
  if (!req.query.id) {
    res.status(400).send("Bad Request. need id!");
    return;
  }
  const id = parseInt(req.query.id as string);

  switch (req.method) {
    case "GET":
      try {
        const todo = await prisma.todo.findUnique({ where: { id } });
        res.status(200).send(todo);
      } catch (error) {}
      break;
    case "PUT":
      try {
        const todo = await prisma.todo.update({
          data: { id, ...req.body, updatedAt: new Date() },
          where: { id },
        });
        res.status(200).send(todo);
      } catch (error) {
        console.log(error);
        res.status(500).json(error);
      }
      break;
    case "DELETE":
      try {
        await prisma.todo.delete({ where: { id } });
        res.status(204).send("ok");
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
