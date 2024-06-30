import { Hono } from "hono";
import { eq } from "drizzle-orm";
import { Session, User } from "lucia";
import { v2 as cloudinary } from "cloudinary";

import { db } from "@/drizzle/db";
import { categories, productCategories, products, users } from "@/drizzle/schema";
import { partialProductValidator, productValidator } from "@/lib/validations/product";
import { santizeFileFolderName } from "@/lib/utils";
import { ProductTypes } from "@/types";
import { fetchAllProductsHandler } from "@/controllers/products.controller";

const product = new Hono<{
    Variables: {
        user: User | null;
        session: Session | null;
    }
}>();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

product.post("/upload-product", productValidator, async (c) => {
    try {
        const productData = c.req.valid("form");
        const userId = c.get("user")?.id;

        const user = await db.query.users.findFirst({
            where: eq(users.id, userId as string)
        });

        let imageUrl: string = "";
        if (productData.image) {
            const mimeType = productData.image.type;
            const imageData = await productData.image.arrayBuffer();
            const base64Image = Buffer.from(imageData).toString('base64');

            const sanitizedTitle = santizeFileFolderName(productData.title);

            const uploadImage = await cloudinary.uploader.upload(`data:${mimeType};base64,${base64Image}`, {
                public_id: "cover-img",
                folder: sanitizedTitle,
            });
            imageUrl = uploadImage.secure_url
        }

        await db.transaction(async (tx) => {
            const newProduct = await tx.insert(products).values({
                ...productData,
                coverImg: imageUrl,
                authorId: user?.id as string
            }).returning({ id: products.id});

            if (productData.categories && productData.categories.length > 0) {
                const categoryIds = await Promise.all(
                    productData.categories.map(async (categoryName: string) => {
                        let category = await tx.query.categories.findFirst({
                            where: eq(categories.name, categoryName)
                        });

                        if (!category) {
                            const newCategory = await tx.insert(categories).values({
                                name: categoryName
                            }).returning();
                            category = newCategory[0];
                        }

                        return category.id
                    })
                );

                await tx.insert(productCategories).values(
                    categoryIds.map((categoryId: number) => ({
                        productId: newProduct[0].id,
                        categoryId: categoryId
                    }))
                );
            }
        });

        return c.text("Product added successfully", 200);
    } catch (error) {
        console.error(error);
        return c.text("Internal Server Error", 500);
    }
});

product.put("/modify-product/:id", partialProductValidator, async (c) => {
    try {
        const productId = c.req.param("id");
        const productData = c.req.valid("form");
        const userId = c.get("user")?.id;
        console.log("Data: ", productData);

        const user = await db.query.users.findFirst({
            where: eq(users.id, userId as string)
        });

        if (!user) {
            return c.text("Unauthorized", 401);
        }

        let imageUrl: string = "";
        if (productData.image) {
            const mimeType = productData.image.type;
            const imageData = await productData.image.arrayBuffer();
            const base64Image = Buffer.from(imageData).toString('base64');

            const sanitizedTitle = santizeFileFolderName(productData.title as string);

            const uploadImage = await cloudinary.uploader.upload(`data:${mimeType};base64,${base64Image}`, {
                public_id: "cover-img",
                folder: sanitizedTitle,
            });
            imageUrl = uploadImage.secure_url;
        }

        const updateFields: ProductTypes = {};
        if (productData.title) updateFields.title = productData.title;
        if (productData.description) updateFields.description = productData.description;
        if (productData.price) updateFields.price = productData.price;
        if (productData.rating !== undefined) updateFields.rating = productData.rating;
        if (productData.type) updateFields.type = productData.type;
        if (productData.status) updateFields.status = productData.status;
        if (imageUrl) updateFields.coverImg = imageUrl;

        await db.transaction(async (tx) => {
            if (Object.keys(updateFields).length > 0) {
                const updatedProduct = await tx
                    .update(products)
                    .set(updateFields)
                    .where(eq(products.id, parseInt(productId, 10)))
                    .returning({ id: products.id });
                
                // Make sure updatedProduct is not empty before proceeding
                if (updatedProduct.length === 0) {
                    throw new Error("Product not found or not updated");
                }
            }

            if (productData.categories && productData.categories.length > 0) {
                await tx
                    .delete(productCategories)
                    .where(eq(productCategories.productId, parseInt(productId, 10)));

                const categoryIds = await Promise.all(
                    productData.categories.map(async (categoryName: string) => {
                        let category = await tx.query.categories.findFirst({
                            where: eq(categories.name, categoryName)
                        });

                        if (!category) {
                            const newCategory = await tx.insert(categories).values({
                                name: categoryName
                            }).returning();
                            category = newCategory[0];
                        }

                        return category.id
                    })
                );

                await tx.insert(productCategories).values(
                    categoryIds.map((categoryId) => ({
                        productId: parseInt(productId, 10),
                        categoryId: categoryId
                    }))
                )
            }
        });

        return c.text("Product updated successfully", 200);
    } catch (error) {
        console.error(error);
        return c.text("Internal Server Error", 500);
    }
});

product.get("/fetch-all-products", ...fetchAllProductsHandler);

export default product;