import { getTask } from "@/_lib/actions/taskActions";
import Projects from "../_components/Projects";
import { Task } from "@/types";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const tasks = await getTask(Number(id));

  return <Projects tasks={tasks as unknown as Task[]} id={id} />;
}
