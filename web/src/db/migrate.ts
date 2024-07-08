import { migrate } from "drizzle-orm/neon-http/migrator";
import { db } from ".";

const main = async () => {
  try {
    console.log("⏳ Running migrations...");

    const start = Date.now();

    await migrate(db, { migrationsFolder: "drizzle" });

    const end = Date.now();

    console.log(`✅ Migrations completed in ${end - start}ms`);
  } catch (error) {
    console.error("Error during migration: ", error);
    process.exit(1);
  }
};

main();
