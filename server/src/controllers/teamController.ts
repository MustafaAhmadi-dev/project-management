import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getTeams = async (req: Request, res: Response) => {
  try {
    const teams = await prisma.team.findMany();

    const teamsWithUsernames = await Promise.all(
      teams.map(async (team: any) => {
        const productOwner = await prisma.user.findUnique({
          where: {
            userId: team.productOwnerUserId,
          },
          select: { username: true },
        });

        const projectManager = await prisma.user.findUnique({
          where: {
            userId: team.projectManagerUserId,
          },
          select: { username: true },
        });

        return {
          ...team,
          productOwnerUsername: productOwner?.username
            .split(/(?<![A-Z])(?=[A-Z])/)
            .join(" "),
          projectManagerUsername: projectManager?.username
            .split(/(?<![A-Z])(?=[A-Z])/)
            .join(" "),
        };
      })
    );

    res.json(teamsWithUsernames);
  } catch (error: any) {
    res.status(500).json({ message: `Failed to get teams; ${error.message}` });
  }
};
