import React from "react";
import ReusablePriorityPage from "../_components/ReusablePriorityPage";
import { Priority } from "@/_lib/api";

const High = () => {
  return <ReusablePriorityPage priority={Priority.High} />;
};

export default High;
