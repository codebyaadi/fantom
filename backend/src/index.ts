import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import user from "@/routes/users.route";

declare module "bun" {
  interface Env {
    DATABASE_URL: string;
    JWT_SECRET: string;
  }
}

const app = new Hono();

app.use(cors());
app.use(logger());
app.get('/', (c) => {
  return c.text('Hello Hono!')
});

app.route("/", user);

export default app
