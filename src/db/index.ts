import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema";

const url = process.env.DATABASE_URL;

if (!url) {
	throw new Error("DATABASE_URL is not defined");
}

export const db = drizzle(url, { schema });
