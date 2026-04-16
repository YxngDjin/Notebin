import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));



const sqlite = new Database(path.resolve(__dirname, "../../data/sqlite.db"));
const db = drizzle({ client: sqlite });

export default db;
