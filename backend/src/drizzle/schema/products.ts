import { index, integer, pgEnum, pgTable, serial, timestamp, uuid, varchar, vector } from "drizzle-orm/pg-core";
import { users } from "./users";
import { categories } from "./categories";
import { relations } from "drizzle-orm";

export const productEnum = pgEnum("product_type", ["manga", "manhwa", "manhua"]);
export const statusEnum = pgEnum("status_type", ["On going", "Complete", "On hold", "Dropped"]);

export const products = pgTable("products", {
    id: serial("id").primaryKey(),
    title: varchar("name", { length: 255 }).notNull(),
    description: varchar("description", { length: 1000 }).notNull(),
    price: integer("price").notNull(),
    rating: integer("rating").notNull().default(0),
    type: productEnum("type").default("manga").notNull(),
    status: statusEnum("status").default("On going").notNull(),
    embedding: vector('embedding', { dimensions: 384 }),
    authorId: uuid("author_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
    categoryId: integer("category_id").references(() => categories.id, { onDelete: "cascade" }).notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().$onUpdate(() => new Date())
}, (table) => ({
    embeddingIndex: index("embeddingIndex").using("hnsw", table.embedding.op("vector_cosine_ops"))
}));

export const productsRelations = relations(products, ({ one }) => ({
    user: one(users, { fields: [products.id], references: [users.id] }),
    category: one(categories, {
        fields: [products.id],
        references: [categories.id],
    }),
}));

export type InsertProduct = typeof products.$inferInsert;
export type SelectProduct = typeof products.$inferSelect;