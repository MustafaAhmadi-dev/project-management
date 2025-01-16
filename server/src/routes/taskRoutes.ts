import { Router } from "express";
import {
  createTask,
  getAllTasks,
  getTasks,
  getUserTasks,
  updataTaskStatus,
} from "../controllers/taskController";

const router = Router();

router.get("/overview", getAllTasks);
router.get("/", getTasks);
router.post("/", createTask);
router.patch("/:taskId/status", updataTaskStatus);
router.get("/user/:userId", getUserTasks);

export default router;
