import { Router } from "express";
import { createCommand, deleteCommand, getAllCommands, getCommandBySlug } from "../controller/command.controller.js";

const commandRouter = Router();

commandRouter.get("/", getAllCommands);
commandRouter.get("/:slug", getCommandBySlug);
commandRouter.post("/", createCommand);
commandRouter.delete("/:slug", deleteCommand);

export default commandRouter;