"use client";

import {
  AlertCircle,
  AlertOctagon,
  AlertTriangle,
  CalendarCheck2,
  ChevronDown,
  ChevronUp,
  FolderKanban,
  Home,
  Layers3,
  LockIcon,
  Search,
  Settings,
  ShieldAlert,
  User,
  Users,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { SidebarLinkProps } from "../types";
import { useAppDispatch, useAppSelector } from "@/_lib/store";
import { setIsSidebarCollapsed } from "@/_lib/globalSlice";
import { useGetProjectsQuery } from "@/_lib/api";

export default function Sidebar() {
  const [showProjects, setShowProjects] = useState(false);
  const [showPriority, setShowPriority] = useState(false);

  const { data: projects } = useGetProjectsQuery();

  const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  );

  const sidebarClassname = `fixed z-40 flex h-full w-64 flex-col justify-between overflow-y-auto bg-white shadow-xl transition-all duration-300 dark:bg-black ${
    isSidebarCollapsed ? "w-0 hidden" : "w-64"
  }`;

  return (
    <div className={sidebarClassname}>
      <div className="flex h-full w-full flex-col justify-start">
        {/* Top Logo */}
        <div className="z-50 flex min-h-[56px] w-64 items-center justify-between bg-white px-6 pt-3 dark:bg-black">
          <div className="text-xl font-bold text-gray-800 dark:text-white">
            sidebar
          </div>
          {isSidebarCollapsed ? null : (
            <button
              onClick={() =>
                dispatch(setIsSidebarCollapsed(!isSidebarCollapsed))
              }
              className="py-3"
            >
              <X className="h-6 w-6 text-gray-800 hover:text-gray-500 dark:text-white" />
            </button>
          )}
        </div>
        {/* Team */}
        <div className="flex items-center gap-5 border-y-[1.5px] border-gray-200 px-8 py-4 dark:border-gray-700">
          <Image src="/logo.png" alt="logo" width={40} height={40} />
          <div>
            <h3 className="text-base font-bold tracking-wide dark:text-gray-200">
              My Team
            </h3>

            <div className="mt-1 flex items-center gap-2">
              <LockIcon className="mt-[0.1rem] h-3 w-3 text-gray-500 dark:text-gray-400" />
              <p className="text-xs text-gray-500">Private</p>
            </div>
          </div>
        </div>
        {/* Navbar Links */}
        <nav className="z-10 w-full">
          <SidebarLink href="/" Icon={Home} label="Home" />
          <SidebarLink href="/timeline" Icon={CalendarCheck2} label="Timeline" />
          <SidebarLink href="/search" Icon={Search} label="Search" />
          <SidebarLink href="/settings" Icon={Settings} label="Settings" />
          <SidebarLink href="/teams" Icon={Users} label="Team" />
          <SidebarLink href="/users" Icon={User} label="Users" />
        </nav>

        {/* Projects Links */}
        <button
          onClick={() => setShowProjects((perv) => !perv)}
          className="flex w-full items-center justify-between px-8 py-3 text-gray-500"
        >
          <span>Projects</span>
          {showProjects ? (
            <ChevronUp className="h-5 w-5" />
          ) : (
            <ChevronDown className="h-5 w-5" />
          )}
        </button>

        {/* Projects List */}
        {showProjects &&
          projects?.map((project) => (
            <SidebarLink
              key={project.id}
              label={project.name}
              Icon={FolderKanban}
              href={`/projects/${project.id}`}
            />
          ))}

        {/* Priority Links */}
        <button
          onClick={() => setShowPriority((perv) => !perv)}
          className="flex w-full items-center justify-between px-8 py-3 text-gray-500"
        >
          <span>Priority</span>
          {showPriority ? (
            <ChevronUp className="h-5 w-5" />
          ) : (
            <ChevronDown className="h-5 w-5" />
          )}
        </button>

        {showPriority && (
          <>
            <SidebarLink
              href="/priority/urgent"
              Icon={AlertCircle}
              label="Urgent"
            />
            <SidebarLink
              href="/priority/high"
              Icon={ShieldAlert}
              label="High"
            />
            <SidebarLink
              href="/priority/medium"
              Icon={AlertTriangle}
              label="Medium"
            />
            <SidebarLink href="/priority/low" Icon={AlertOctagon} label="Low" />
            <SidebarLink
              href="/priority/backlog"
              Icon={Layers3}
              label="Backlog"
            />
          </>
        )}
      </div>
    </div>
  );
}

function SidebarLink({ href, Icon, label }: SidebarLinkProps) {
  const pathname = usePathname();
  const isActive =
    href === pathname || (pathname === "/" && href === "/dashboard");

  return (
    <Link href={href} className="w-full">
      <div
        className={`relative flex cursor-pointer items-center justify-start gap-3 px-8 py-3 transition-colors hover:bg-gray-100 dark:bg-black dark:hover:bg-gray-700 ${
          isActive ? "bg-gray-100 text-white dark:bg-gray-600" : ""
        }`}
      >
        {isActive && (
          <div className="absolute left-0 top-0 h-[100%] w-[5px] bg-blue-200" />
        )}

        <Icon className="h-6 w-6 text-gray-800 dark:text-gray-100" />
        <span className="font-medium text-gray-800 dark:text-gray-100">
          {label}
        </span>
      </div>
    </Link>
  );
}
