import { boolean, pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
    id: uuid("id").primaryKey().defaultRandom(),
    name: varchar("name", { length: 255 }).notNull(),
    username: varchar("username", { length: 25 }).notNull().unique(),
    email: varchar("email", { length: 255 }).notNull().unique(),
    email_verified: boolean("email_verified").default(false).notNull(),
    hashed_password: varchar("hashed_password", { length: 255 }).notNull(),
    avatar: varchar("avatar", { length: 255 }),
    
    created_at: timestamp("created_at").notNull().defaultNow(),
    updated_at: timestamp("updated_at").notNull().$onUpdate(() => new Date())
});

export type InsertUser = typeof users.$inferInsert;
export type SelectUser = typeof users.$inferSelect;

