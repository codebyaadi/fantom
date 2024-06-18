import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { csrf } from "hono/csrf";
import { Session, User } from "lucia";

import user from "@/routes/users.route";
import product from "@/routes/products.route";
import { authMiddleware } from "./middleware";

declare module "bun" {
  interface Env {
    DATABASE_URL: string;
    HF_TOKEN: string;
    CLOUDINARY_API_SECRET: string;
    CLOUDINARY_API_KEY: string;
    CLOUDINARY_CLOUD_NAME: string;
  }
}

const app = new Hono<{
  Variables: {
    user: User | null;
    session: Session | null;
  }
}>();

app.use(cors());
app.use(logger());
// app.use(csrf());
app.use("*", authMiddleware);
app.get('/', (c) => {
  return c.text('Hello Hono!')
});

app.post('/upload', async (c) => {
  const body = await c.req.formData();
  console.log("Body: ", body.get("image"));
  
  return c.text("Success", 200)
});

app.route("/", user);
app.route("/", product);

export default app
