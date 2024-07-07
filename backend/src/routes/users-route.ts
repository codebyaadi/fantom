import { Hono } from "hono";

import { logInHandler, signUpHandler } from "@/handlers/users-handler";

const user = new Hono();

user.post("/add-user", ...signUpHandler);
user.post("/login", ...logInHandler);

export default user;
