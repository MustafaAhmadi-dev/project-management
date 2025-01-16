import React from "react";
import ReusablePriorityPage from "../_components/ReusablePriorityPage";
import { Priority } from "@/_lib/api";

const Urgent = () => {
  return <ReusablePriorityPage priority={Priority.Urgent} />;
};

export default Urgent;
