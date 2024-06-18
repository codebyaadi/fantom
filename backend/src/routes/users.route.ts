import { Hono } from "hono";

import { logInHandler, signUpHandler } from "@/controllers/users.controller";

const user = new Hono();

user.post("/add-user", ...signUpHandler);
user.post("/login", ...logInHandler);

export default user;
