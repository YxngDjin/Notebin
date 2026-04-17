import express from "express";
import cors from "cors";
import snippetRouter from "./routes/snippet.routes.js";
import "./db/migrate.js";
import commandRouter from "./routes/command.router.js";

const app = express();

app.use(express.json());
app.use(cors(
    {
        origin: "*"
    }
))


app.get("/", (req, res) => {
    res.send("Hello from API!");
});

app.use("/api/snippets", snippetRouter);
app.use("/api/commands", commandRouter);

app.listen(3002, () => {
    console.log("API listening on port 3002");
});