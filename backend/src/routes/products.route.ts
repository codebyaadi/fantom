import { Hono } from "hono";
import { eq } from "drizzle-orm";
import { Session, User } from "lucia";
import { v2 as cloudinary } from "cloudinary";

import { db } from "@/drizzle/db";
import { categories, productCategories, products, users } from "@/drizzle/schema";
import { productValidator } from "@/lib/validations/product";

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
            const uploadImage = cloudinary.uploader.upload(`data:${mimeType};base64,${base64Image}`);
            imageUrl = (await uploadImage).url
            console.log("Image: ", imageUrl);
        }

        const newProduct = await db.insert(products).values({
            ...productData,
            coverImg: imageUrl,
            authorId: user?.id as string,
        }).returning({ id: products.id });

        if (productData.categories && productData.categories.length > 0) {
            const categoryIds = await Promise.all(
                productData.categories.map(async (categoryName: string) => {
                    let category = await db.query.categories.findFirst({
                        where: eq(categories.name, categoryName)
                    });

                    if (!category) {
                        const newCategory = await db.insert(categories).values({
                            name: categoryName
                        }).returning();
                        category = newCategory[0];
                    }

                    return category.id
                })
            );

            await db.insert(productCategories).values(
                categoryIds.map((categoryId) => ({
                    productId: newProduct[0].id,
                    categoryId: categoryId,
                }))
            );
        }
        return c.text("Product added successfully", 200);
    } catch (error) {
        console.error(error);
        return c.text("Internal Server Error", 500);
    }
});

product.post("/upload-temp", productValidator, async (c) => {
    try {
        const productData = c.req.valid("form");
        const mimeType = productData.image?.type;
        console.log("Prod. Data: ", productData);
        console.log("Path: ", productData.image?.type)

        return c.text("Product added successfull", 200)
    } catch (error) {
        console.error(error);
        return c.text("Internal Server Error", 500);
    }
});

export default product;