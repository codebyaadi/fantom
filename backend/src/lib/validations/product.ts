import { z } from "zod";
import { zValidator } from "@hono/zod-validator";

const MAX_UPLOAD_SIZE = 1024 * 1024 * 3;
const ACCEPTED_FILE_TYPES = ["image/jpeg", "image/png"]

export const productSchema = z.object({
    title: z.string().min(1).max(128),
    description: z.string().min(1).max(1024),
    price: z.coerce.number().int().positive(),
    rating: z.coerce.number().int().min(0).max(5).optional(),
    type: z.enum(["manga", "manhwa", "manhua"]),
    status: z.enum(["On going", "Complete", "On hold", "Dropped"]),
    categories: z.array(z.string()).optional(),
    image: z
        .instanceof(File)
        .optional()
        .refine((file) => {
            return !file || file.size <= MAX_UPLOAD_SIZE;
        }, "File must be less than 3MB")
        .refine((file) => {
            if (file) {
                return ACCEPTED_FILE_TYPES.includes(file.type);
            }
        }, "File must be image"),
});

export const productValidator = zValidator("form", productSchema, (result, c) => {
    if (!result.success) {
        const errors = result.error.errors
            .map((err) => `${err.path[0]}: ${err.message}`)
            .join(", ");
        return c.text(`Invalid: ${errors}`, 400);
    }
});

export const partialProductSchema = z.object({
    title: z.string().min(1).max(128),
    description: z.string().min(1).max(1024),
    price: z.coerce.number().int().positive(),
    rating: z.coerce.number().int().min(0).max(5),
    type: z.enum(["manga", "manhwa", "manhua"]),
    status: z.enum(["On going", "Complete", "On hold", "Dropped"]),
    // categories: z.array(z.string()),
    categories: z.string().transform((str) => {
        try {
            return JSON.parse(str)
        } catch (error) {
            return [];
        }
    }).pipe(z.array(z.string())),
    image: z
        .instanceof(File)
        .refine((file) => {
            return !file || file.size <= MAX_UPLOAD_SIZE;
        }, "File must be less than 3MB")
        .refine((file) => {
            if (file) {
                return ACCEPTED_FILE_TYPES.includes(file.type);
            }
        }, "File must be image"),
}).partial();

export const partialProductValidator = zValidator("form", partialProductSchema, (result, c) => {
    if (!result.success) {
        console.log(result)
        const errors = result.error.errors
            .map((err) => `${err.path[0]}: ${err.message}`)
            .join(", ");
        return c.text(`Invalid: ${errors}`, 400);
    }
});


