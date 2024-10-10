import {
  boolean,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  username: varchar('username', { length: 25 }).unique(),
  email: varchar('email', { length: 320 }).unique(),
  emailVerified: boolean('email_verified').default(false),
  walletAddress: varchar('wallet_address', { length: 65 }).notNull().unique(),
  avatar: varchar('avatar', { length: 255 }),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .$onUpdate(() => new Date()),
});

export type InsertUser = typeof users.$inferInsert;
export type SelectUser = typeof users.$inferSelect;
