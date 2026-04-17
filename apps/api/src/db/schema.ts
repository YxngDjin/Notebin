import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const snippet = sqliteTable("snippet", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    title: text("title").notNull(),
    description: text("description"),
    hashedPassword: text("hashed_password"),
    content: text("content").notNull(),
    tags: text("tags"),
    language: text("language").notNull(),
    expiresAt: text("expires_at"),
    createdAt: text("created_at").notNull().default(sql`(CURRENT_TIMESTAMP)`),
    isPinned: integer("is_pinned", { mode: 'boolean' }).default(false),
    slug: text("slug").notNull().unique(),
})

export const command = sqliteTable("command", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    title: text("title").notNull(),
    command: text("command").notNull(),
    language: text("language").notNull(),
    description: text("description"),
    tags: text("tags"),
    isPinned: integer("is_pinned", { mode: 'boolean' }).default(false),
    createdAt: text("created_at").notNull().default(sql`(CURRENT_TIMESTAMP)`),
    slug: text("slug").notNull().unique(),
})