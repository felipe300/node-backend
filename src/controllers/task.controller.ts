import type { Request, Response } from "express";

export const getAllTask = (_: Request, res: Response) => {
  res.status(200).json({ message: "GET ALL" });
};

export const getTaskById = (_: Request, res: Response) => {
  res.status(200).json({ message: "GET Id" });
};

export const createTask = (_: Request, res: Response) => {
  res.status(200).json({ message: "CREATE" });
};
export const updateTaskById = (_: Request, res: Response) => {
  res.status(200).json({ message: "UPDATE" });
};
export const deleteTaskById = (_: Request, res: Response) => {
  res.status(200).json({ message: "DELETE" });
};
