import type { Request, Response } from "express";
import { db } from "../db/db.ts";
import { tasksTable } from "../db/schema.ts";

export const getAllTask = (_: Request, res: Response) => {
  res.status(200).json({ message: "GET ALL" });
};

export const getTaskById = (_: Request, res: Response) => {
  res.status(200).json({ message: "GET Id" });
};

export const createTask = async (req: Request, res: Response) => {
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

    res.status(200).json({ message: "Task Created", task: result.at(0) });
  } catch (err) {
    res.status(500).json({ message: "Error to create task", error: err });
  }
};

export const updateTaskById = (_: Request, res: Response) => {
  res.status(200).json({ message: "UPDATE" });
};
export const deleteTaskById = (_: Request, res: Response) => {
  res.status(200).json({ message: "DELETE" });
};
