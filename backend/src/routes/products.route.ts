import { Hono } from "hono";
import { eq } from "drizzle-orm";
import { Session, User } from "lucia";
import { v2 as cloudinary } from "cloudinary";

import { db } from "@/drizzle/db";
import { categories, productCategories, products, users } from "@/drizzle/schema";
import { productValidator } from "@/lib/validations/product";
import { santizeFileFolderName } from "@/lib/utils";

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
                )
            }
        });

        return c.text("Product added successfully", 200);
    } catch (error) {
        console.error(error);
        return c.text("Internal Server Error", 500);
    }
});

export default product;