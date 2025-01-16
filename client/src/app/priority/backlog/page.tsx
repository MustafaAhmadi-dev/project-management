import React from "react";
import ReusablePriorityPage from "../_components/ReusablePriorityPage";
import { Priority } from "@/_lib/api";

const Backlog = () => {
  return <ReusablePriorityPage priority={Priority.Backlog} />;
};

export default Backlog;
