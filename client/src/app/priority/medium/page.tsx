import React from "react";
import ReusablePriorityPage from "../_components/ReusablePriorityPage";
import { Priority } from "@/_lib/api";

const Medium = () => {
  return <ReusablePriorityPage priority={Priority.Medium} />;
};

export default Medium;
