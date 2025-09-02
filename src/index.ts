import express from "express";
import type { Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(express.json());

const port = process.env.PORT || 8080;

app.get("/", async (req: Request, res: Response, next): Promise<void> => {
  try {
    res.status(200).json({
      message: `Running on port: ${port}!!`,
      success: true,
    });
  } catch (error: unknown) {
    next(new Error((error as Error).message));
  }
});

app.listen(port, () => {
  console.log(`Server is up and running on port ${port}!!!`);
});
