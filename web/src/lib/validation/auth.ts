import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

export const signUpSchema = z.object({
  name: z.string().min(1, "Name is required").max(50, "Name is too long"),
  username: z
    .string()
    .trim()
    .min(1, "Username is required")
    .max(50, "Username is too long"),
  email: z
    .string()
    .trim()
    .email("Invalid email address")
    .max(50, "Email is too long"),
  password: z.string().min(8, "Password must be 8 char long"),
});

export const signUpValidator = zValidator("json", signUpSchema, (result, c) => {
  if (!result.success) {
    const errors = result.error.errors
      .map((err) => `${err.path[0]}: ${err.message}`)
      .join(", ");
    return c.text(`Invalid: ${errors}`, 400);
  }
});

export const logInSchema = z.object({
  identity: z
    .string()
    .min(1, "Username or email is required")
    .max(50, "Username or email is too long"),
  password: z.string().min(8, "Password must be 8 characters long"),
});

export const logInValidator = zValidator("json", logInSchema, (result, c) => {
  if (!result.success) {
    const errors = result.error.errors
      .map((err) => `${err.path[0]}: ${err.message}`)
      .join(", ");
    return c.text(`Invalid: ${errors}`, 400);
  }
});
