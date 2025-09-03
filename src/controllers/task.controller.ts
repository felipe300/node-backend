import type { Request, Response } from "express";
import { db } from "../db/db.ts";
import { tasksTable } from "../db/schema.ts";
import { eq } from "drizzle-orm";
import type { Server, Socket } from "socket.io";

export const getAllTask = async (_: Request, res: Response) => {
  try {
    const task = await db.select().from(tasksTable).values();

    res.status(200).json({ message: "Get all tasks", task });
  } catch (err) {
    res.status(500).json({ message: "Error to get tasks", error: err });
  }
};

export const getTaskById = async (req: Request, res: Response) => {
  const taskId = req.params.id || "";

  if (!taskId) {
    return res
      .status(400)
      .json({ message: "Task Id is missing from the request parameters." });
  }
  try {
    const task = await db
      .select()
      .from(tasksTable)
      .where(eq(tasksTable.id, taskId))
      .execute();

    res.status(200).json({ message: "Get task by id", task: task[0] });
  } catch (err) {
    res.status(500).json({
      message: `Error to get task with id. Id '${taskId}' do not exits!`,
      error: err,
    });
  }
};

export const createTask = async (req: Request, res: Response, io: Server) => {
  try {
    const { title, description, status } = req.body;
    const result = await db
      .insert(tasksTable)
      .values({
        id: crypto.randomUUID(),
        title,
        description,
        status,
      })
      .returning({
        id: tasksTable.id,
        title: tasksTable.title,
        description: tasksTable.description,
        status: tasksTable.status,
      });

    const newTask = result.at(0);

    io.emit("New task", newTask);

    res.status(201).json({ message: "Task Created", task: newTask });
  } catch (err) {
    res.status(500).json({ message: "Error to create task", error: err });
  }
};

export const updateTaskById = async (
  req: Request,
  res: Response,
  io: Server,
) => {
  const taskId = req.params.id || "";
  const { title, description, status } = req.body;

  if (!taskId) {
    return res
      .status(400)
      .json({ message: "Task Id is missing from the request parameters." });
  }
  try {
    const newTask = await db
      .update(tasksTable)
      .set({
        title,
        description,
        status,
      })
      .where(eq(tasksTable.id, taskId))
      .returning({
        title: tasksTable.title,
        description: tasksTable.description,
        status: tasksTable.status,
      })
      .execute();

    io.emit("Update task", newTask);

    res
      .status(203)
      .json({ message: `Task with id: '${taskId}' updated`, task: newTask });
  } catch (err) {
    res.status(500).json({
      message: `Error to update task with id. Id '${taskId}' do not exits!`,
      error: err,
    });
  }
};

export const deleteTaskById = async (
  req: Request,
  res: Response,
  io: Server,
) => {
  const taskId = req.params.id || "";

  if (!taskId) {
    return res
      .status(400)
      .json({ message: "Task Id is missing from the request parameters." });
  }

  try {
    const taskToDelete = await db
      .delete(tasksTable)
      .where(eq(tasksTable.id, taskId))
      .execute();

    if (taskToDelete.length === 0) {
      return res
        .status(404)
        .json({ message: `Task with id: '${taskId}' not found.` });
    }

    await db.delete(tasksTable).where(eq(tasksTable.id, taskId)).execute();

    io.emit("Delete task", taskId);

    res.status(200).json({ message: `Task with id: '${taskId}' deleted` });
  } catch (err) {
    res.status(500).json({
      message: `Error to delete task with id. Id '${taskId}' do not exits!`,
      error: err,
    });
  }
};
