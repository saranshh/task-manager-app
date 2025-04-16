import { Router } from "express";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";
import { auth, AuthRequest } from "../middleware/auth.js";

const router = Router();
const prisma = new PrismaClient();

const taskSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().optional(),
  status: z.enum(["pending", "completed"]).default("pending"),
});

router.use(auth); 

router.get("/", async (req: AuthRequest, res) => {
  const tasks = await prisma.task.findMany({
    where: { userId: req.user!.id },
    orderBy: { createdAt: "desc" },
  });
  res.json(tasks);
});

router.post("/", async (req: AuthRequest, res) => {
  const taskData = taskSchema.parse(req.body);
  const task = await prisma.task.create({
    data: {
      ...taskData,
      title: taskData.title || "",  
      userId: req.user!.id,
    },
  });
  res.status(201).json(task);
});

router.put("/:id", async (req: AuthRequest, res) => {
  const taskData = taskSchema.parse(req.body);
  const task = await prisma.task.findFirst({
    where: {
      id: req.params.id,
      userId: req.user!.id,
    },
  });

  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }

  const updatedTask = await prisma.task.update({
    where: { id: req.params.id },
    data: taskData,
  });
  res.json(updatedTask); 
});

router.delete("/:id", async (req: AuthRequest, res) => {
  const task = await prisma.task.findFirst({
    where: {
      id: req.params.id,
      userId: req.user!.id,
    },
  });

  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }

  await prisma.task.delete({
    where: { id: req.params.id },
  });
  res.status(204).send();
});

export default router;
