import React from "react";
import ReusablePriorityPage from "../_components/ReusablePriorityPage";
import { Priority } from "@/_lib/api";

const Low = () => {
  return <ReusablePriorityPage priority={Priority.Low} />;
};

export default Low;
