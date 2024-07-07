import { Hono } from "hono";

const app = new Hono();

app.get("/", (c) => {
  return c.json({ products: ["1", "2"] });
});

export default app;
