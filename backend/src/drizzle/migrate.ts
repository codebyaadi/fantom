import {migrate} from "drizzle-orm/neon-http/migrator";
import { db } from "@/drizzle/db";

const main = async () => {
    try {
        await migrate(db, {migrationsFolder: "./src/drizzle/migrations"});
        console.log("Migration Completed")
    } catch (error) {
        console.error("Error during migration: ", error);
        process.exit(1);
    }
};

main();