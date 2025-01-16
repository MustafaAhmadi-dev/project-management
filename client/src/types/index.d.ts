import { LucideIcon } from "lucide-react";

declare type initialStateTypes = {
  isSidebarCollapsed: boolean;
  isDarkMode: boolean;
};

declare type SidebarLinkProps = {
  href: string;
  Icon: LucideIcon;
  label: string;
  // isCollapsed:boolean
};

// declare enum Priority {
//   Urgent = "Urgent",
//   High = "High",
//   Medium = "Medium",
//   Low = "Low",
//   Backlog = "Backlog",
// }

// export enum Status {
//   ToDo = "To Do",
//   WorkInProgress = "Work In Progress",
//   UnderReview = "Under Review",
//   Completed = "Completed",
// }

declare type User = {
  userId?: number;
  userName: string;
  email: string;
  profilePictureUrl?: string;
  cognitoId?: string;
  teamId?: number;
};

// declare type Comment = {};

declare type Attachment = {
  id: number;
  fileURL: string;
  fileName: string;
  taskId: number;
  uploadedById: number;
};

declare type Project = {
  id: number;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
};

declare type Task = {
  id: number;
  title: string;
  description?: string;
  status?: Status;
  priority?: Priority;
  tags?: string;
  startDate?: string;
  dueDate?: string;
  points?: number;
  projectId: number;
  authorUserId?: number;
  assignedUserId?: number;

  author?: User;
  assignee?: User;
  comments?: Comment[];
  attachments?: Attachment[];
};

declare type SearchResults = {
  tasks?: Task[];
  projects?: Project[];
  users?: User[];
};

declare type Team = {
  teamId: number;
  teamName: string;
  productOwnerUserId?: number;
  projectManagerUserId?: number;
};

declare type ProjectHeaderProps = {
  activeTab: string;
  setActiveTab: (tabName: string) => void;
};

declare type TabButtonProps = {
  name: string;
  icon: React.ReactNode;
  setActiveTab: (tabName: string) => void;
  activeTab: string;
};

declare type HeaderProps = {
  name: string;
  buttonComponent?: any;
  isSmallText?: boolean;
};

declare type ProjectTabsProps = {
  id: string;
  setIsModalNewTaskOpen: (isOpen: boolean) => void;
};

declare type TaskColumnProps = {
  status: string;
  tasks: Task[];
  moveTask: (taskId: number, toStatus: string) => void;
  setIsModalNewTaskOpen: (isOpen: boolean) => void;
};

declare type TaskTypeItems = "task" | "milestone" | "project";

declare type ModalProps = {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  name: string;
};

declare type ModalNewTaskProps = {
  isOpen: boolean;
  onClose: () => void;
  id?: string | null;
};

declare type SearchResults = {
  tasks?: Task[];
  projects?: Project[];
  users?: User[];
};