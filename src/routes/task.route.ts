import { Router } from "express";
import {
  getAllTask,
  getTaskById,
  createTask,
  updateTaskById,
  deleteTaskById,
} from "../controllers/task.controller.ts";
import type { Server } from "socket.io";

const router = (io: Server) => {
  const router = Router();

  router.get("/", getAllTask);
  router.get("/:id", getTaskById);
  router.post("/", (req, res) => createTask(req, res, io));
  router.put("/:id", (req, res) => updateTaskById(req, res, io));
  router.delete("/:id", (req, res) => deleteTaskById(req, res, io));

  return router;
};

export default router;
