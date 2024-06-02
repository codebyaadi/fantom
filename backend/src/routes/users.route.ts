import { Hono } from "hono";

const user = new Hono();

user.post("/add-user", async (c) => {
    const user = await c.req.json();
    console.log(user);
    return c.text("Added user")
});

export default user;