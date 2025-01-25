import { Project } from "@/types";
import React from "react";

const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <div className="rounded border p-4 shadow flex flex-col text-lg gap-2">
      <h3>{project.name}</h3>
      <p>{project.description}</p>
      <p>Start Date: {project.startDate}</p>
      <p>End Date: {project.endDate}</p>
    </div>
  );
};

export default ProjectCard;
