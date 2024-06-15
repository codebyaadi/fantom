import { lucia } from "@/lib/auth";
import { Hono } from "hono";
import { getCookie } from "hono/cookie";
import { csrf } from "hono/csrf";

import type { User, Session } from "lucia";

const app = new Hono<{
    Variables: {
        user: User | null;
        session: Session | null;
    }
}>();

app.use(csrf());

app.use("*", async (c, next) => {
    const sessionId = getCookie(c, lucia.sessionCookieName) ?? null;
    
});