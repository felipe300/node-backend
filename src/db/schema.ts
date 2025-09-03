import "dotenv/config";
import { sql } from "drizzle-orm";
import { index, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const tasksTable = sqliteTable(
  "task",
  {
    id: text("id", { length: 36 }).primaryKey(),
    title: text("titulo").notNull(),
    description: text("descripcion").notNull(),
    status: text().default("pendiente"),
    createAt: text("fechaCreacion")
      .notNull()
      .default(sql`(current_timestamp)`),
    updatedAt: text("fechaActualizacion")
      .notNull()
      .default(sql`(current_timestamp)`),
  },
  (table) => {
    return {
      title_idx: index("title_idx").on(table.title),
      description_idx: index("description_idx").on(table.description),
    };
  },
);
