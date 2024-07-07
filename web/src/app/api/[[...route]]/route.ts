import { Hono } from "hono";
import { handle } from "hono/vercel";

import products from "@/app/api/[[...route]]/products"

export const runtime = "edge";

const app = new Hono().basePath("/api");

app.get("/hello", (c) => {
    return c.json({
        message: "Hello! NextJS + Hono"
    })
});

app.route("/products", products);

export const GET = handle(app)
export const POST = handle(app)