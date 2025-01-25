/* eslint-disable @typescript-eslint/no-unused-vars */
"use server";

import { revalidatePath } from "next/cache";
import prisma from "../prisma";
import { formatISO } from "date-fns";

export async function getAllTasks() {
  try {
    const tasks = await prisma.task.findMany();

    return tasks;
  } catch (error) {
    console.log(`Failed to fetch all the tasks; ${error}`);
  }
}

export async function getTask(projectId: number) {
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

    return tasks;
  } catch (error) {
    console.log(`Failed to fetch the task; ${error}`);
  }
}

export async function getUserTasks(userId: number | string) {
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
    return tasks;
  } catch (error) {
    console.log(`Failed to fetch the user's tasks; ${error}`);
  }
}

export async function updateTaskStatus(
  taskId: number,
  status: string,
  projectId: number
) {
  try {
    const updatedTask = await prisma.task.update({
      where: {
        id: Number(taskId),
      },
      data: {
        status: status,
      },
    });

    revalidatePath(`/projects/${projectId}`);
  } catch (error) {
    console.log(`Failed to update status of the task; ${error}`);
  }
}

export async function createTask(id: string | null, formData: FormData) {
  try {
    const newTask = await prisma.task.create({
      data: {
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        status: formData.get("status") as string,
        tags: formData.get("tags") as string,
        priority: formData.get("priority") as string,
        startDate: formatISO(new Date(formData.get("startDate") as string), {
          representation: "complete",
        }),
        dueDate: formatISO(new Date(formData.get("dueDate") as string), {
          representation: "complete",
        }),
        points: Number(formData.get("points")),
        projectId: Number(formData.get("projectId")),
        assignedUserId: Number(formData.get("assignedUserId")),
        authorUserId: Number(formData.get("authorUserId")),
      },
    });

    if (id) {
      revalidatePath(`/projects/${id}`);
    } else {
      revalidatePath(`/projects`);
    }
  } catch (error) {
    console.log(`Failed to create the task; ${error}`);
  }
}
