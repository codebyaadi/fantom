import { integer, pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { products } from "./products";
import { relations } from "drizzle-orm";

export const chapters = pgTable("chapters", {
    id: serial("id").primaryKey(),
    productId: integer("product_id").references(() => products.id, { onDelete: "cascade" }),
    title: varchar("title", { length: 255 }).notNull(),
    chapterNumber: integer("chapter_number").notNull(),
    imageUrls: text("image_urls").array().notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().$onUpdate(() => new Date())
});

export const chaptersRelations = relations(chapters, ({ one }) => ({
    product: one(products, { fields: [chapters.id], references: [products.id] })
}));

export type InsertChapter = typeof chapters.$inferInsert;
export type SelectChapter = typeof chapters.$inferSelect;