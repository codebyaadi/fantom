import { db } from "../db";
import { InsertCategory, categories } from "../schema";

const categoryData: InsertCategory[] = [
    { name: "Romance" },
    { name: "Isekai" },
    { name: "Action" },
    { name: "Dungeon" },
    { name: "Fantasy" },
    { name: "Mystery" },
];

const categorySeed = async () => {
    try {
        console.log("Seeding category...");
        await db.insert(categories).values(categoryData);
        console.log("Data seeded.")
    } catch(error) {
        console.log("Err", error);
    }
}

categorySeed();