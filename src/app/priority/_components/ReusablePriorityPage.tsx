import { filteredTask } from "@/types";
import { getUserTasks } from "@/_lib/actions/taskActions";
import ReusablePriority from "./ReusablePriorityClient";
import { Priority } from "@/_lib/utils";

const ReusablePriorityPage = async ({ priority }: { priority: Priority }) => {
  const userId = 2;
  const tasks = await getUserTasks(userId);

  const filteredTasks = tasks?.filter((task) => task.priority === priority);

  if (!tasks) return <div>Error fetching tasks</div>;

  return (
    <ReusablePriority tasks={filteredTasks as unknown as filteredTask[]} />
  );
};

export default ReusablePriorityPage;
