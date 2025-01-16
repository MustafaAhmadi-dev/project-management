import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllTasks = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const tasks = await prisma.task.findMany();
    res.json(tasks);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Failed to get all the tasks; ${error.message}` });
  }
};

export const getTasks = async (req: Request, res: Response): Promise<void> => {
  const { projectId } = req.query;

  try {
    const tasks = await prisma.task.findMany({
      where: {
        projectId: Number(projectId),
      },
      include: {
        author: true,
        assignee: true,
        comments: true,
        attachments: true,
      },
    });

    res.json(tasks);
  } catch (error: any) {
    res.status(500).json({ message: `Failed to get task; ${error.message}` });
  }
};

export const getUserTasks = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { userId } = req.params;

  try {
    const tasks = await prisma.task.findMany({
      where: {
        OR: [
          { authorUserId: Number(userId) },
          { assignedUserId: Number(userId) },
        ],
      },
      include: {
        author: true,
        assignee: true,
      },
    });
    res.json(tasks);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Failed to get user's tasks; ${error.message}` });
  }
};

export const createTask = async (
  req: Request,
  res: Response
): Promise<void> => {
  const {
    title,
    description,
    status,
    tags,
    points,
    priority,
    projectId,
    startDate,
    dueDate,
    assignedUserId,
    authorUserId,
  } = req.body;

  try {
    const newTask = await prisma.task.create({
      data: {
        title,
        description,
        status,
        tags,
        points,
        priority,
        projectId,
        startDate,
        dueDate,
        assignedUserId,
        authorUserId,
      },
    });

    res.status(201).json(newTask);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Failed to create task; ${error.message}` });
  }
};

export const updataTaskStatus = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { taskId } = req.params;
  const { status } = req.body;

  try {
    const updatedTask = await prisma.task.update({
      where: {
        id: Number(taskId),
      },
      data: {
        status: status,
      },
    });

    res.json(updatedTask);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Failed to update task status; ${error.message}` });
  }
};
