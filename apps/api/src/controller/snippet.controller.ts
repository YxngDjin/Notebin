import { NextFunction, Response, Request } from "express";
import { snippet } from "../db/schema.js";
import db from "../db/db.js";
import { eq } from "drizzle-orm";
import { nanoid } from "nanoid";
import { comparePassword, hashPassword } from "../utils/index.js";

export const getAllSnippets = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await db
            .select()
            .from(snippet);

        const data = result.map(({ hashedPassword, ...snippet }) => snippet);

        res.status(200).json({
            success: true,
            message: `${result.length} snippets found.`,
            data: data
        })
        
    } catch (e) {
        console.log(`Error getting snippets: ${e}`);
        next(e);
    }
}

export const getSnippetById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { slug } = req.params;
        let saveData;

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

        if (result[0].hashedPassword) {
            res.status(200).json({
                success: true,
                isProtected: true,
                message: "Please Enter Password.",
                data: {
                    title: result[0].title,
                    slug: result[0].slug,
                    language: result[0].language,
                }
            })
            return;
        }

        const { hashedPassword, ...snippetData } = result[0];

        res.status(200).json({
            success: true,
            isProtected: false,
            message: "Snippet found.",
            data: snippetData
        })
    } catch (e) {
        console.log(`Error getting snippet: ${e}`);
        next(e);
    }
}

export const unlockSnippet = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { slug } = req.params;
        const { password } = req.body;

        if (!slug || Array.isArray(slug)) {
            res.status(400).json({
                success: false,
                message: "Slug is required."
            })
            return;
        }

        if (!password) {
            res.status(400).json({
                success: false,
                message: "Password is required."
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

        const isPasswordValid = await comparePassword(password, result[0].hashedPassword as string);

        if (!isPasswordValid) {
            res.status(401).json({
                success: false,
                message: "Invalid password."
            })
            return;
        }

        const { hashedPassword, ...snippetData } = result[0];

        res.status(200).json({
            success: true,
            message: "Snippet found.",
            data: snippetData
        })
        
    } catch (e) {
        console.log(e);
        next(e);
    }
}

export const createSnippet = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { title, content, language, expiresAt, password } = req.body;

        if (!title || !content || !language) {
            res.status(400).json({
                success: false,
                message: "Title, content and language are required."
            })
            return;
        }

        const slug = nanoid();
        let hashePassword = null;

        if (password) {
            hashePassword = await hashPassword(password);
        }

        const result = await db
            .insert(snippet)
            .values({
                title,
                content,
                language,
                hashedPassword: hashePassword,
                expiresAt,
                slug
            })
            .returning();


        const snippetReturn = result[0];
        const { hashedPassword, ...snippetData } = snippetReturn;
        
        res.status(201).json({
            success: true,
            message: "Snippet created.",
            data: snippetData
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