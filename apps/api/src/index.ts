import express from "express";
import cors from "cors";
import snippetRouter from "./routes/snippet.routes.js";

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

app.listen(3002, () => {
    console.log("API listening on port 3002");
});