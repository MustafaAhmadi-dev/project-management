"use client";

import { useState } from "react";
import ModalNewTask from "./ModalNewTask";
import ProjectHeader from "./ProjectHeader";
import Board from "./BoardView";
import List from "./ListView";
import Timeline from "./TimelineView";
import Table from "./TableView";
import { Task } from "@/types";

export default function Projects({ id, tasks }: { id: string; tasks: Task[] }) {
  const [activeTab, setActiveTab] = useState("Board");
  const [isModalNewTaskOpen, setIsModalNewTaskOpen] = useState(false);

  return (
    <div>
      <ModalNewTask
        isOpen={isModalNewTaskOpen}
        onClose={() => setIsModalNewTaskOpen(false)}
        id={id}
      />

      <ProjectHeader activeTab={activeTab} setActiveTab={setActiveTab} />

      {activeTab === "Board" && (
        <Board
          tasks={tasks}
          setIsModalNewTaskOpen={setIsModalNewTaskOpen}
          id={id}
        />
      )}

      {activeTab === "List" && (
        <List tasks={tasks} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />
      )}

      {activeTab === "Timeline" && (
        <Timeline tasks={tasks} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />
      )}

      {activeTab === "Table" && (
        <Table tasks={tasks} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />
      )}
    </div>
  );
}
