import React, { useState } from "react";
import { formatISO } from "date-fns";
import Modal from "@/_components/Modal";
import { createProject } from "@/_lib/actions/projectActions";
import { useFormStatus } from "react-dom";
import { ModalNewProjectProps } from "@/types";

const ModalNewProject = ({ isOpen, onClose }: ModalNewProjectProps) => {
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const isFormValid = () => {
    return projectName && description && startDate && endDate;
  };

  const inputStyles =
    "w-full rounded border border-gray-300 p-2 shadow-sm dark:border-dark-tertiary dark:bg-dark-tertiary dark:text-white dark:focus:outline-none";

  return (
    <Modal isOpen={isOpen} onClose={onClose} name="Create New Project">
      <form
        action={async () => {
          if (!projectName || !startDate || !endDate) return;

          const formattedStartDate = formatISO(new Date(startDate), {
            representation: "complete",
          });
          const formattedEndDate = formatISO(new Date(endDate), {
            representation: "complete",
          });

          await createProject(
            projectName,
            description,
            formattedStartDate,
            formattedEndDate
          );

          onClose();
        }}
        className="mt-4 space-y-6"
      >
        <input
          type="text"
          name='projectName'
          className={inputStyles}
          placeholder="Project Name"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
        />
        <textarea
        name='description'
          className={inputStyles}
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-2">
          <input
            type="date"
            name=''
            className={inputStyles}
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <input
            type="date"
            name=''
            className={inputStyles}
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <SubmitButton isFormValid={isFormValid} />
      </form>
    </Modal>
  );
};

function SubmitButton({ isFormValid }: { isFormValid: () => string }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className={`focus-offset-2 mt-4 flex w-full justify-center rounded-md border border-transparent bg-blue-primary px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 ${
        !isFormValid() || pending ? "cursor-not-allowed opacity-50" : ""
      }`}
      disabled={!isFormValid() || pending}
    >
      {pending ? "Creating..." : "Create Project"}
    </button>
  );
}

export default ModalNewProject;
