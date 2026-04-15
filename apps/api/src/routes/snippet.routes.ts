import { Router } from "express";
import { createSnippet, deleteSnippet, getAllSnippets, getSnippetById } from "../controller/snippet.controller.js";

const snippetRouter = Router();

snippetRouter.get("/", getAllSnippets);
snippetRouter.get("/:slug", getSnippetById);
snippetRouter.delete("/:slug", deleteSnippet);
snippetRouter.post("/", createSnippet);

export default snippetRouter;