import { boolean, pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
    id: uuid("id").primaryKey().defaultRandom(),
    name: varchar("name", { length: 255 }).notNull(),
    username: varchar("username", { length: 25 }).notNull().unique(),
    email: varchar("email", { length: 255 }).notNull().unique(),
    email_verified: boolean("email_verified").default(false).notNull(),
    hashed_password: varchar("hashed_password", { length: 255 }),
    avatar: varchar("avatar", { length: 255 }),
    
    created_at: timestamp("created_at").notNull().defaultNow(),
    updated_at: timestamp("updated_at").notNull().$onUpdate(() => new Date())
});

export type InsertUser = typeof usersTable.$inferInsert;
export type SelectUser = typeof usersTable.$inferSelect;

