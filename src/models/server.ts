import express from "express";
import cors from "cors";
import type { Express, Request, Response } from "express";
import dotenv from "dotenv";

import { getTasks } from "../controllers/task.controller.ts";

dotenv.config();

export class Server {
  private app: Express;
  private port: number;

  constructor() {
    this.app = express();
    this.port = Number(process.env.PORT) || 8080;

    this.applyMiddlewares();
    this.routes();
  }

  applyMiddlewares() {
    this.app.use(cors());
    this.app.use(express.json());
  }

  routes() {
    this.app.get(
      "/",
      async (req: Request, res: Response, next): Promise<void> => {
        try {
          res.status(200).json({
            message: `Running on port: ${this.port}!!`,
            success: true,
          });
        } catch (error: unknown) {
          next(new Error((error as Error).message));
        }
      },
    );

    this.app.get("/task", getTasks);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server is up and running on port ${this.port}!!!`);
    });
  }
}
