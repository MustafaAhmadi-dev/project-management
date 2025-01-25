import React from "react";
import ReusablePriorityPage from "../_components/ReusablePriorityPage";
import { Priority } from "@/_lib/utils";

const High = () => {
  return <ReusablePriorityPage priority={Priority.High} />;
};

export default High;
