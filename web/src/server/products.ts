"use server";

import { productSchema } from "@/lib/validation/products";
import { z } from "zod";

export async function addProduct(formData: z.infer<typeof productSchema>) {}
