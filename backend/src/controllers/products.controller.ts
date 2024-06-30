import { db } from "@/drizzle/db";
import { createFactory } from "hono/factory";

const factory = createFactory();

export const fetchAllProductsHandler = factory.createHandlers(async (c) => {
    try {
        const products = await db.query.products.findMany();
        return c.json(products, 200);
    } catch (error) {
        console.error(error);
        return c.text("Internal Server Error", 500);
    }
});