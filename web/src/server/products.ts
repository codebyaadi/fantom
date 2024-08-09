"use server";

import { z } from "zod";
import { v2 as cloudinary } from "cloudinary";

import { validateRequest } from "@/lib/auth/validate";
import { productSchema } from "@/lib/validation/products";
import { sanatizeFileFolderName } from "@/lib/utils";
import { db } from "@/db";
import { categories, productCategories, products } from "@/db/schema";
import { env } from "@/env/server";
import { eq } from "drizzle-orm";

cloudinary.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
});

export async function addProduct(formData: z.infer<typeof productSchema>) {
  try {
    const parsed = productSchema.parse(formData);
    const { user } = await validateRequest();

    if (!user) {
      return {
        success: false,
        message: "No user found with this ID",
      };
    }

    let imageUrl: string = "";
    if (parsed.image) {
      const mimeType = parsed.image.type;
      const imageData = await parsed.image.arrayBuffer();
      const base64Image = Buffer.from(imageData).toString("base64");

      const sanatizedTitle = sanatizeFileFolderName(parsed.title);

      const uploadImage = await cloudinary.uploader.upload(
        `data:${mimeType};base64,${base64Image}`,
        {
          public_id: "cover-img",
          folder: sanatizedTitle,
        },
      );
      imageUrl = uploadImage.secure_url;
    }

    await db.transaction(async (tx) => {
      const newProduct = await tx
        .insert(products)
        .values({
          ...parsed,
          coverImg: imageUrl,
          authorId: user.id,
        })
        .returning({ id: products.id });

      if (parsed.categories && parsed.categories.length > 0) {
        const categoriesIds = await Promise.all(
          parsed.categories.map(async (categoryName: string) => {
            let category = await tx.query.categories.findFirst({
              where: eq(categories.name, categoryName),
            });

            if (!category) {
              const newCategory = await tx
                .insert(categories)
                .values({
                  name: categoryName,
                })
                .returning();
              category = newCategory[0];
            }

            return category.id;
          }),
        );

        await tx.insert(productCategories).values(
          categoriesIds.map((categoryId: number) => ({
            productId: newProduct[0].id,
            categoryId: categoryId,
          })),
        );
      }
    });

    return {
      success: true,
      message: "Product added successfully",
    };
  } catch (error) {
    console.log(error);
    return {
        success: false,
        message: "Internal Server Error",
        error: error
      };
  }
}
