import { NextFunction, Request, Response } from "express";
import db from "../db/db.js";
import { command } from "../db/schema.js";
import { eq } from "drizzle-orm";
import { nanoid } from "nanoid";

export const getAllCommands = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await db
            .select()
            .from(command);

        if (result.length === 0) {
            res.status(200).json({
                success: true,
                message: "No commands found.",
                data: result
            })
            return;
        }

        res.status(200).json({
            success: true,
            message: `${result.length} commands found.`,
            data: result
        })

    } catch (e) {
        console.log(e);
        next(e);
    }
}

export const getCommandBySlug = async (req: Request, res: Response, next: NextFunction) => {
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
            .from(command)
            .where(eq(command.slug, slug))

        if (result.length === 0) {
            res.status(404).json({
                success: false,
                message: "No command found."
            })
            return;
        }

        res.status(200).json({
            success: true,
            message: "Command found.",
            data: result
        })
    } catch (e) {
        console.log(e);
        next(e);
    }
}

export const createCommand = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { title, command: commandText, language, description, tags } = req.body;

        if (!title || !commandText || !language) {
            res.status(400).json({
                success: false,
                message: "Title, command and language are required."
            })
            return;
        }

        const slug = nanoid();

        const result = await db
            .insert(command)
            .values({
                title,
                command: commandText,
                language,
                description,
                tags,
                slug
            })
            .returning();
        
        if (!result) {
            res.status(500).json({
                success: false,
                message: "Failed to create command."
            })
            return;
        }

        res.status(201).json({
            success: true,
            message: "Command created.",
            data: result
        })
    } catch (e) {
        console.log(e);
        next(e);
    }
}

export const deleteCommand = async (req: Request, res: Response, next: NextFunction) => {
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
            .delete(command)
            .where(eq(command.slug, slug))
            .returning();

        if (result.length === 0) {
            res.status(404).json({
                success: false,
                message: "No command found."
            })
            return;
        }
        
        res.status(200).json({
            success: true,
            message: "command deleted."
        })

    } catch (e) {
        console.log(e)
        next(e)
    }
}