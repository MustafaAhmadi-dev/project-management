"use client";

import Modal from "@/_components/Modal";
// import { useCreateTaskMutation } from "@/_lib/api";
import { Priority, Status } from "@/_lib/utils";
import { createTask } from "@/_lib/actions/taskActions";
import { ModalNewTaskProps } from "@/types/index";
import { useFormStatus } from "react-dom";
// import { useActionState } from "react";
// import { formatISO } from "date-fns";
// import { useState } from "react";

function ModalNewTask({ isOpen, onClose, id = null }: ModalNewTaskProps) {
  // const [state, formAction] = useActionState(createTask, undefined);
  const createTaskAction = createTask.bind(null, id);

  const selectStyles =
    "mb-4 block w-full rounded border border-gray-300 px-3 py-2 dark:border-dark-tertiary dark:bg-dark-tertiary dark:text-white dark:focus:outline-none";

  const inputStyles =
    "w-full rounded border border-gray-300 p-2 shadow-sm dark:border-dark-tertiary dark:bg-dark-tertiary dark:text-white dark:focus:outline-none";

  return (
    <Modal isOpen={isOpen} onClose={onClose} name="Create New Task">
      <form className="mt-4 space-y-6" action={createTaskAction}>
        <input
          type="text"
          name="title"
          className={inputStyles}
          placeholder="Title"
        />
        <textarea
          name="description"
          className={inputStyles}
          placeholder="Description"
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-2">
          <select name="status" className={selectStyles}>
            <option value="">Select Status</option>
            <option value={Status.ToDo}>To Do</option>
            <option value={Status.WorkInProgress}>Work In Progress</option>
            <option value={Status.UnderReview}>Under Review</option>
            <option value={Status.Completed}>Completed</option>
          </select>

          <select name="priority" className={selectStyles}>
            <option value="">Select Priority</option>
            <option value={Priority.Urgent}>Urgent</option>
            <option value={Priority.High}>High</option>
            <option value={Priority.Medium}>Medium</option>
            <option value={Priority.Low}>Low</option>
            <option value={Priority.Backlog}>Backlog</option>
          </select>
        </div>

        <input
          type="text"
          name="tags"
          className={inputStyles}
          placeholder="Tags (comma separated)"
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-2">
          <input name="startDate" type="date" className={inputStyles} />
          <input type="date" name="dueDate" className={inputStyles} />
        </div>

        <input
          type="text"
          name="authorUserId"
          className={inputStyles}
          placeholder="Author User ID"
        />
        <input
          type="text"
          name="assignedUserId"
          className={inputStyles}
          placeholder="Assigned User ID"
        />

        {id === null && (
          <input
            type="text"
            name="projectId"
            className={inputStyles}
            placeholder="ProjectId"
          />
        )}

        <SubmitButton />
      </form>
    </Modal>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className={`focus-offset-2 mt-4 flex w-full justify-center rounded-md border border-transparent bg-blue-primary px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 ${
        pending ? "cursor-not-allowed opacity-50" : ""
      }`}
      disabled={pending}
    >
      {pending ? "Creating..." : "Create Task"}
    </button>
  );
}

// function ModalNewTask({ isOpen, onClose, id = null }: ModalNewTaskProps) {
//   const [createTask, { isLoading }] = useCreateTaskMutation();
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [status, setStatus] = useState<Status>(Status.ToDo);
//   const [priority, setPriority] = useState<Priority>(Priority.Backlog);
//   const [tags, setTags] = useState("");
//   const [startDate, setStartDate] = useState("");
//   const [dueDate, setDueDate] = useState("");
//   const [authorUserId, setAuthorUserId] = useState<number>();
//   const [assignedUserId, setAssignedUserId] = useState<number>();
//   const [projectId, setProjectId] = useState<number>();

//   const isFormValid = () => {
//     return title && authorUserId && (id !== null || projectId);
//   };

//   async function handleSubmit() {
//     if (!title || !authorUserId) return;

//     const formattedStartDate = formatISO(new Date(startDate), {
//       representation: "complete",
//     });
//     const formattedDueDate = formatISO(new Date(dueDate), {
//       representation: "complete",
//     });

//     await createTask({
//       title,
//       description,
//       status,
//       priority,
//       tags,
//       projectId: Number(id) || projectId,
//       startDate: formattedStartDate,
//       dueDate: formattedDueDate,
//       authorUserId,
//       assignedUserId,
//     });

//     onClose();
//   }

//   const selectStyles =
//     "mb-4 block w-full rounded border border-gray-300 px-3 py-2 dark:border-dark-tertiary dark:bg-dark-tertiary dark:text-white dark:focus:outline-none";

//   const inputStyles =
//     "w-full rounded border border-gray-300 p-2 shadow-sm dark:border-dark-tertiary dark:bg-dark-tertiary dark:text-white dark:focus:outline-none";

//   return (
//     <Modal isOpen={isOpen} onClose={onClose} name="Create New Task">
//       <form
//         className="mt-4 space-y-6"
//         onSubmit={(e) => {
//           e.preventDefault();
//           handleSubmit();
//         }}

//       >
//         <input
//           type="text"
//           name="title"
//           className={inputStyles}
//           placeholder="Title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//         />
//         <textarea
//           name="description"
//           className={inputStyles}
//           placeholder="Description"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//         />
//         <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-2">
//           <select
//             name="status"
//             className={selectStyles}
//             value={status}
//             onChange={(e) =>
//               setStatus(Status[e.target.value as keyof typeof Status])
//             }
//           >
//             <option value="">Select Status</option>
//             <option value={Status.ToDo}>To Do</option>
//             <option value={Status.WorkInProgress}>Work In Progress</option>
//             <option value={Status.UnderReview}>Under Review</option>
//             <option value={Status.Completed}>Completed</option>
//           </select>
//           <select
//             name="priority"
//             className={selectStyles}
//             value={priority}
//             onChange={(e) =>
//               setPriority(Priority[e.target.value as keyof typeof Priority])
//             }
//           >
//             <option value="">Select Priority</option>
//             <option value={Priority.Urgent}>Urgent</option>
//             <option value={Priority.High}>High</option>
//             <option value={Priority.Medium}>Medium</option>
//             <option value={Priority.Low}>Low</option>
//             <option value={Priority.Backlog}>Backlog</option>
//           </select>
//         </div>
//         <input
//           type="text"
//           name="tags"
//           className={inputStyles}
//           placeholder="Tags (comma separated)"
//           value={tags}
//           onChange={(e) => setTags(e.target.value)}
//         />

//         <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-2">
//           <input
//             name="startDate"
//             type="date"
//             className={inputStyles}
//             value={startDate}
//             onChange={(e) => setStartDate(e.target.value)}
//           />
//           <input
//             type="date"
//             name="dueDate"
//             className={inputStyles}
//             value={dueDate}
//             onChange={(e) => setDueDate(e.target.value)}
//           />
//         </div>
//         <input
//           type="text"
//           name="authorUserId"
//           className={inputStyles}
//           placeholder="Author User ID"
//           value={authorUserId}
//           onChange={(e) => setAuthorUserId(Number(e.target.value))}
//         />
//         <input
//           type="text"
//           name="assignedUserId"
//           className={inputStyles}
//           placeholder="Assigned User ID"
//           value={assignedUserId}
//           onChange={(e) => setAssignedUserId(Number(e.target.value))}
//         />
//         {id === null && (
//           <input
//             type="text"
//             name="projectId"
//             className={inputStyles}
//             placeholder="ProjectId"
//             value={projectId}
//             onChange={(e) => setProjectId(Number(e.target.value))}
//           />
//         )}
//         <button
//           type="submit"
//           className={`focus-offset-2 mt-4 flex w-full justify-center rounded-md border border-transparent bg-blue-primary px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 ${
//             !isFormValid() || isLoading ? "cursor-not-allowed opacity-50" : ""
//           }`}
//           disabled={!isFormValid() || isLoading}
//         >
//           {isLoading ? "Creating..." : "Create Task"}
//         </button>
//       </form>
//     </Modal>
//   );
// }

export default ModalNewTask;
