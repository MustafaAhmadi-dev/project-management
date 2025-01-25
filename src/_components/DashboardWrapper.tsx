import { PropsWithChildren } from "react";
import StoreProvider from "@/app/StoreProvider";
import DashboardLayout from "./DashboardLayout";
import { Project } from "@/types";
import { getAllProjects } from "@/_lib/actions/projectActions";

export default async function DashboardWrapper({
  children,
}: PropsWithChildren) {
  const projects = await getAllProjects();

  return (
    <StoreProvider>
      <DashboardLayout projects={projects as unknown as Project[]}>
        {children}
      </DashboardLayout>
    </StoreProvider>
  );
}
