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
import { users } from "./users";

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
    title: varchar("title", { length: 128 }).notNull(),
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
  (t) => ({
    embeddingIdx: index("embeddingIdx").using(
      "hnsw",
      t.embedding.op("vector_cosine_ops"),
    ),
    authorIdIdx: index("authorIdIdx").on(t.authorId),
  }),
);
