import { pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core";

export const categories = pgTable(
    "categories", {
        id: serial("id").primaryKey(),
        name: varchar("name", {length: 256}).unique().notNull(),
        createdAt: timestamp("created_at").notNull().defaultNow(),
        updatedAt: timestamp("updated_at")
          .notNull()
          .$onUpdate(() => new Date()),
    }
)