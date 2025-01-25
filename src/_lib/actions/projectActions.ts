/* eslint-disable @typescript-eslint/no-unused-vars */
"use server";



import { revalidatePath } from "next/cache";
import prisma from "../prisma";

export async function getAllProjects() {
  try {
    const projects = await prisma.project.findMany();

    return projects;
  } catch (error) {
    console.log(`Failed to fetch all the projects; ${error}`);
  }
}

export async function createProject(
  name: string,
  description: string,
  startDate: string,
  endDate: string
) {
  try {
    const newProject = await prisma.project.create({
      data: {
        name,
        description,
        startDate,
        endDate,
      },
    });

    revalidatePath("/projects");
  } catch (error) {
    console.log(`Failed to create the project; ${error}`);
  }
}
