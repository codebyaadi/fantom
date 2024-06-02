import { Hono } from "hono";
import { cors } from "hono/cors";
import user from "@/routes/users.route";

const app = new Hono()

app.use(cors())
app.get('/', (c) => {
  return c.text('Hello Hono!')
});

app.route("/", user);

export default app
