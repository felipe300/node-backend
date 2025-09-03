import express from "express";
import cors from "cors";
import type { Express } from "express";
import dotenv from "dotenv";
import logger from "morgan";

import router from "../routes/task.route.ts";

import { Server, Socket } from "socket.io";
import { createServer } from "node:http";

dotenv.config();

export class MainServer {
  private app: Express;
  private port: number;
  private server: any;
  private io: any;

  constructor() {
    this.app = express();
    this.port = Number(process.env.PORT) || 8080;
    this.server = createServer(this.app);
    this.io = new Server(this.server, { connectionStateRecovery: {} });

    this.io.on("connection", (socket: Socket) => {
      console.log("An user has connected");

      socket.on("disconnect", () => {
        console.log("An user has disconnect");
      });

      socket.on("Chat message", async (msg) => {
        try {
          console.log("aaa");
        } catch (error) {
          console.log(error);
        }
        this.io.emit("Chat message", msg);
      });
    });

    this.applyMiddlewares();
    this.routes();
  }

  applyMiddlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.static("client"));
    this.app.use(logger("dev"));
  }

  routes() {
    this.app.get("/", (req, res) => {
      res.sendFile(process.cwd() + "/client/index.html");
    });

    this.app.use("/tasks", router(this.io));
  }

  listen() {
    this.server.listen(this.port, () => {
      console.log(`Server is up and running on port ${this.port}!!!`);
    });
  }
}
