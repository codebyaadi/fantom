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
    if (!sessionId) {
        c.set("user", null);
        c.set("session", null);
        return next();
    }

    const { session, user } = await lucia.validateSession(sessionId);
    if (session && session.fresh) {
        c.header("Set-Cookie", lucia.createSessionCookie(session.id).serialize(), {
            append: true
        });
    }
    if (!session) {
        c.header("Set-Cookie", lucia.createBlankSessionCookie().serialize(), {
            append: true
        });
    }
    c.set("user", user);
    c.set("session", session);
    return next();
});