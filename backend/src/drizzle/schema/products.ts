import {
    index,
    integer,
    pgEnum,
    pgTable,
    serial,
    text,
    timestamp,
    uuid,
    varchar,
    vector,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { users } from "./users";
import { productCategories } from "./categories";
import { chapters } from "./chapters";

export const productEnum = pgEnum("product_type", [
    "manga",
    "manhwa",
    "manhua",
]);
export const statusEnum = pgEnum("status_type", [
    "On going",
    "Complete",
    "On hold",
    "Dropped",
]);

export const products = pgTable(
    "products",
    {
        id: serial("id").primaryKey(),
        title: varchar("name", { length: 128 }).notNull(),
        description: varchar("description", { length: 1024 }).notNull(),
        coverImg: text("cover_img"),
        price: integer("price").notNull(),
        rating: integer("rating").notNull().default(0),
        type: productEnum("type").default("manga").notNull(),
        status: statusEnum("status").default("On going").notNull(),
        embedding: vector("embedding", { dimensions: 1024 }),
        authorId: uuid("author_id")
            .references(() => users.id, { onDelete: "cascade" })
            .notNull(),
        createdAt: timestamp("created_at").notNull().defaultNow(),
        updatedAt: timestamp("updated_at")
            .notNull()
            .$onUpdate(() => new Date()),
    },
    (table) => ({
        embeddingIdx: index("embeddingIdx").using(
            "hnsw",
            table.embedding.op("vector_cosine_ops")
        ),
        authorIdIdx: index("authorIdIdx").on(
            table.authorId
        ),
    })
);

export const productsRelations = relations(products, ({ one, many }) => ({
    author: one(users, { fields: [products.authorId], references: [users.id] }),
    categories: many(productCategories, { relationName: "productCategories" }),
    chapters: many(chapters, { relationName: "productChapters" })
}));

export type InsertProduct = typeof products.$inferInsert;
export type SelectProduct = typeof products.$inferSelect;
