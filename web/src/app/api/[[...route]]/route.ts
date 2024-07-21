import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { handle } from "hono/vercel";
import { Context } from "@/lib/auth/types";

export const runtime = "edge";

const app = new Hono<Context>().basePath("/api");

app.use(cors());
app.use(logger());
app.get("/hello", (c) => {
  return c.json({
    message: "Hello! NextJS + Hono",
  });
});

export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);
