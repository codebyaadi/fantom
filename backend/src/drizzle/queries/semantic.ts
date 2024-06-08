import { generateEmbedding } from "@/lib/embeddings"
import { cosineDistance, gt, sql } from "drizzle-orm";
import { products } from "../schema";
import { db } from "../db";

const findSimilarManga = async (description: string) => {
    const embedding = await generateEmbedding(description);

    const similarity = sql<number>`1 - (${cosineDistance(products.embedding, embedding)})`;

    const similarManhwa = await db.select({name: products.title, dec: products.description, similarity}).from(products).where(gt(similarity, 0.5));
    return similarManhwa;
}

const descp = "hunters";

(async () => {
    try {
      const sm = await findSimilarManga(descp);
      console.log(sm);
    } catch (error) {
      console.error("Error generating embedding:", error);
    }
  })();