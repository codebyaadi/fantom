"use server";

import { cookies } from "next/headers";
import { z } from "zod";
import { eq, or } from "drizzle-orm";
import * as argon2 from "argon2";

import { db } from "@/db";
import { users } from "@/db/schema";
import { lucia } from "@/lib/auth";
import { signUpSchema } from "@/lib/validation/auth";
import { getRandomProfileImg } from "@/lib/utils";

export async function register(formData: z.infer<typeof signUpSchema>) {
  try {
    const parsed = signUpSchema.parse(formData);
    const { name, username, email, password } = parsed;
    const hashedPassword = await argon2.hash(password);
    const imageUrl = getRandomProfileImg();
    const existingUser = await db.query.users.findFirst({
      where: or(eq(users.username, username), eq(users.email, email)),
    });

    if (existingUser) {
      throw new Error("Email or username already exist");
    }

    await db.insert(users).values({
      name,
      username,
      email,
      hashedPassword: hashedPassword,
      avatar: imageUrl,
    });

    const newUser = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (!newUser) {
      throw new Error("User not found after insert");
    }

    const session = await lucia.createSession(newUser?.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );

    return {
      message: "You're Sign Up successfully",
      success: true
    }
  } catch (error) {
    console.log(error);
    throw new Error("Internal Server Error");
  }
}
