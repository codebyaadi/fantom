import { boolean, pgEnum, pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const userEnum = pgEnum("user_role", ["reader", "author"]);

export const users = pgTable("users", {
    id: uuid("id").primaryKey().defaultRandom(),
    name: varchar("name", { length: 255 }).notNull(),
    username: varchar("username", { length: 25 }).notNull().unique(),
    email: varchar("email", { length: 255 }).notNull().unique(),
    emailVerified: boolean("email_verified").default(false).notNull(),
    hashedPassword: varchar("hashed_password", { length: 255 }).notNull(),
    avatar: varchar("avatar", { length: 255 }),
    role: userEnum("user_role").default("reader").notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().$onUpdate(() => new Date())
});

export type InsertUser = typeof users.$inferInsert;
export type SelectUser = typeof users.$inferSelect;