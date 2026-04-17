import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const snippet = sqliteTable("snippet", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    title: text("title").notNull(),
    hashedPassword: text("hashed_password"),
    content: text("content").notNull(),
    language: text("language").notNull(),
    expiresAt: text("expires_at"),
    createdAt: text("created_at").notNull().default(sql`(CURRENT_TIMESTAMP)`),
    slug: text("slug").notNull().unique(),
})