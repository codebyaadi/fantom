import { relations } from "drizzle-orm";
import {
    index,
    integer,
    pgTable,
    primaryKey,
    serial,
    timestamp,
    varchar,
} from "drizzle-orm/pg-core";
import { products } from "./products";

export const categories = pgTable("categories", {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 255 }).unique().notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at")
        .notNull()
        .$onUpdate(() => new Date()),
});

export const productCategories = pgTable(
    "product_categories",
    {
        productId: integer("product_id").references(() => products.id, {
            onDelete: "cascade",
        }),
        categoryId: integer("category_id").references(() => categories.id, {
            onDelete: "cascade",
        }),
    },
    (table) => ({
        pk: primaryKey({
            name: "product_category_pk",
            columns: [table.productId, table.categoryId],
        }),
        productCategoriesIdx: index("productCategoriesIdx").on(
            table.productId,
            table.categoryId
        ),
    })
);

export const categoriesRelations = relations(categories, ({ many }) => ({
    products: many(productCategories, { relationName: "productCategories" }),
}));

export const productCategoriesRelations = relations(
    productCategories,
    ({ one }) => ({
        product: one(products, {
            fields: [productCategories.productId],
            references: [products.id],
        }),
        category: one(categories, {
            fields: [productCategories.categoryId],
            references: [categories.id],
        }),
    })
);

export type InsertCategory = typeof categories.$inferInsert;
export type SelectCategory = typeof categories.$inferSelect;
