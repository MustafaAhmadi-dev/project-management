"use client";

import { ReactNode, useEffect } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useAppSelector } from "@/_lib/store";
import { Project } from "@/types";

export default function DashboardLayout({
  children,
  projects,
}: {
  children: ReactNode;
  projects: Project[];
}) {
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  );
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <div className="flex min-h-screen w-full bg-gray-50 text-gray-900">
      <Sidebar projects={projects} />
      <main
        className={`flex w-full flex-col bg-gray-50 dark:bg-dark-bg ${
          isSidebarCollapsed ? "" : "md:pl-64"
        }`}
      >
        <Navbar />
        {children}
      </main>
    </div>
  );
}
