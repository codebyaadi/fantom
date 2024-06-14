import { Lucia } from "lucia";
import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle";
import { db } from "@/drizzle/db";
import { sessions, users } from "@/drizzle/schema";

const adapter = new DrizzlePostgreSQLAdapter(db, sessions , users);

export const lucia = new Lucia(adapter, {
    getSessionAttributes: () => {
        return {};
    },
    
});