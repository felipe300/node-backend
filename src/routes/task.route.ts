import { Router } from "express";
import {
  getAllTask,
  getTaskById,
  createTask,
  updateTaskById,
  deleteTaskById,
} from "../controllers/task.controller.ts";

const taskRouter = Router();

taskRouter.get("/", getAllTask);
taskRouter.get("/:id", getTaskById);
taskRouter.post("/", createTask);
taskRouter.put("/:id", updateTaskById);
taskRouter.delete("/:id", deleteTaskById);

export default taskRouter;
