import { migrate } from "drizzle-orm/better-sqlite3/migrator";
import db from "./db.js";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
migrate(db, { migrationsFolder: path.resolve(__dirname, "../../drizzle") });

console.log("Database migrated.");