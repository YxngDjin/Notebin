import express from "express";
import snippetRouter from "./routes/snippet.routes.js";

const app = express();

app.use(express.json());


app.get("/", (req, res) => {
    res.send("Hello from API!");
});

app.use("/api/snippets", snippetRouter);

app.listen(3002, () => {
    console.log("API listening on port 3002");
});