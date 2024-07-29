"use server";

import { cookies } from "next/headers";
import { z } from "zod";
import { eq, or } from "drizzle-orm";
import * as argon2 from "argon2";

import { lucia } from "@/lib/auth";
import { db } from "@/db";
import { users } from "@/db/schema";
import { logInSchema } from "@/lib/validation/auth";

export async function login(formData: z.infer<typeof logInSchema>) {
  try {
    const parsed = logInSchema.parse(formData);
    const { identity, password } = parsed;
    const user = await db.query.users.findFirst({
      where: or(eq(users.username, identity), eq(users.email, identity)),
    });

    if (!user) {
      return {
        success: false,
        message: "No user found with this ID",
      };
    }

    const passMatch = await argon2.verify(user.hashedPassword, password);

    if (!passMatch) {
      return {
        success: false,
        message: "Credentials are incorrect",
      };
    }

    const session = await lucia.createSession(user.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Something  went wrong",
    };
  }
}
