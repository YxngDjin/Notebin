import { NextFunction, Response, Request } from "express";
import { snippet } from "../db/schema.js";
import db from "../db/db.js";
import { eq } from "drizzle-orm";
import { nanoid } from "nanoid";

export const getAllSnippets = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await db
            .select()
            .from(snippet)

        res.status(200).json({
            success: true,
            message: `${result.length} snippets found.`,
            data: result
        })
        
    } catch (e) {
        console.log(`Error getting snippets: ${e}`);
        next(e);
    }
}

export const getSnippetById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { slug } = req.params;

        if (!slug || Array.isArray(slug)) {
            res.status(400).json({
                success: false,
                message: "Slug is required."
            })
            return;
        }

        const result = await db
            .select()
            .from(snippet)
            .where(eq(snippet.slug, slug))

        if (result.length === 0) {
            res.status(404).json({
                success: false,
                message: "No snippet found."
            })
            return;
        }

        res.status(200).json({
            success: true,
            message: "Snippet found.",
            data: result[0]
        })
    } catch (e) {
        console.log(`Error getting snippet: ${e}`);
        next(e);
    }
}

export const createSnippet = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { title, content, language, expiresAt } = req.body;

        if (!title || !content || !language) {
            res.status(400).json({
                success: false,
                message: "Title, content and language are required."
            })
            return;
        }

        const slug = nanoid();

        const result = await db
            .insert(snippet)
            .values({
                title,
                content,
                language,
                expiresAt,
                slug
            })
            .returning();
        
        res.status(201).json({
            success: true,
            message: "Snippet created.",
            data: result
        })

    } catch (e) {
        console.log(`Error creating snippet: ${e}`);
        next(e)
    }
}

export const deleteSnippet = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { slug } = req.params;

        if (!slug || Array.isArray(slug)) {
            res.status(400).json({
                success: false,
                message: "Slug is required."
            })
            return;
        }

        const result = await db
            .delete(snippet)
            .where(eq(snippet.slug, slug))
            .returning();

        if (result.length === 0) {
            res.status(404).json({
                success: false,
                message: "No snippet found."
            })
            return;
        }
        
        res.status(200).json({
            success: true,
            message: "Snippet deleted."
        })

        
    } catch (e) {
        console.log(`Error deleting snippet: ${e}`);
        next(e);
    }
}