import "dotenv/config";
import { drizzle } from "drizzle-orm/libsql";

export const db = drizzle(process.env.DB_FILE_NAME!);

if (db !== null) {
  console.log("DB connecttion");
} else {
  console.log("something went wrong with your DB connection");
}
