import { getRandomProfileImg } from "@/lib/utils";
import { InsertUser, users } from "../schema";
import { db } from "../db";

const hasher = async (password: string) => {
    const hashed = await Bun.password.hash(password);
    return hashed;
}

const seed_users: InsertUser[] = [
    {
        "name": "Stefan Salvatore",
        "username": "therippah",
        "email": "therippah@gmail.com",
        "hashedPassword": "TheRipper123",
        "avatar": getRandomProfileImg(),
        "role": "author",
    },
    {
        "name": "Damon Salvatore",
        "username": "damn",
        "email": "damon@gmail.com",
        "hashedPassword": "TheLoneVamp",
        "avatar": getRandomProfileImg(),
        "role": "author",
    }
];

const seed = async () => {
    try {
        console.log("Seeding database...");

        for (let user of seed_users) {
            user.hashedPassword = await hasher(user.hashedPassword);
        }

        await db.insert(users).values(seed_users);
        console.log("Data seeded.");
    } catch (error) {
        console.log("Error: ", error);
    }
}

seed();