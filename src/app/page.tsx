import { getAllTasks } from "@/_lib/actions/taskActions";
import HomePage from "./(home)/HomePage";
import { Project, Task } from "@/types";
import { Suspense } from "react";
import { getAllProjects } from "@/_lib/actions/projectActions";

export default async function Home() {
  const projects = await getAllProjects();
  const tasks = await getAllTasks();

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <HomePage
        projects={projects as unknown as Project[]}
        tasks={tasks as unknown as Task[]}
      />
    </Suspense>
  );
}
