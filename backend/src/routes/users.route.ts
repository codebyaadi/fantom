import { Hono } from "hono";
import { eq, or } from "drizzle-orm";

import { db } from "@/drizzle/db";
import { users } from "@/drizzle/schema";
import { getRandomProfileImg } from "@/lib/utils";
import { loginValidator, signupValidator } from "@/lib/validations/auth";
import { lucia } from "@/lib/auth";

const user = new Hono();

user.post("/add-user", signupValidator, async (c) => {
    try {
        const user = c.req.valid("json");
        const hashedPassword = await Bun.password.hash(user.password);
        const imageUrl = getRandomProfileImg();
        const existingUser = await db.query.users.findFirst({
            where: or(eq(users.username, user.username), eq(users.email, user.email)),
        });

        if (existingUser) {
            return c.text("Email or username already exist", 409);
        }

        await db
            .insert(users)
            .values({ ...user, hashedPassword: hashedPassword, avatar: imageUrl });

        const newUser = await db.query.users.findFirst({
            where: eq(users.email, user.email)
        });

        if (!newUser) {
            throw new Error("User not found after insert")
        }

        const session = await lucia.createSession(newUser?.id, {});
        const sessionCookie = lucia.createSessionCookie(session.id);
        c.header("Set-Cookie", sessionCookie.serialize());

        return c.text("Added user", 200);
    } catch (error) {
        console.error("Error Adding User: ", error);
        return c.text("Internal Server Error", 500);
    }
});

user.post("/login", loginValidator, async (c) => {
    try {
        const { identity, password } = c.req.valid("json");
        const user = await db.query.users.findFirst({
            where: or(eq(users.username, identity), eq(users.email, identity)),
        });

        if (!user) {
            return c.text("No user found with this ID", 401);
        }

        const passMatch = await Bun.password.verify(password, user.hashedPassword);

        if (!passMatch) {
            return c.text("Credentials are incorrect", 401);
        }

        const session = await lucia.createSession(user.id, {});
        const sessionCookie = lucia.createSessionCookie(session.id);
        c.header("Set-Cookie", sessionCookie.serialize());

        return c.json({
            user: {
                name: user.name,
                email: user.email,
                username: user.username,
                avatar: user.avatar,
            },
            message: "User logged in successfully"
        });
    } catch (error) { 
        console.error(error);
        return c.text("Internal server error", 500)
     }
});

export default user;
