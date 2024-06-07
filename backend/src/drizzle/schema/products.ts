import { integer, pgEnum, pgTable, serial, timestamp, uuid, varchar, vector } from "drizzle-orm/pg-core";
import { users } from "./users";

export const productType = pgEnum("product_type", ["manga", "manhwa", "manhua"]);

export const products = pgTable("products", {
    id: serial("id").primaryKey(),
    title: varchar("name", { length: 255 }).notNull(),
    description: varchar("description", { length: 255 }).notNull(),
    price: integer("price").notNull(),
    author_id: uuid("author_id").references(() => users.id, {onDelete: "cascade"}).notNull(),
    embedding: vector('embedding', { dimensions: 1536 }),
    created_at: timestamp("created_at").notNull().defaultNow(),
    updated_at: timestamp("updated_at").notNull().$onUpdate(() => new Date())
});

export type InsertProduct = typeof products.$inferInsert;
export type SelectProduct = typeof products.$inferSelect;