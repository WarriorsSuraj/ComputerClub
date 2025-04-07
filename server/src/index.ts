import express from 'express';
import dotenv from "dotenv";
import handleRoute from './routing';
import path from "node:path";

/*
dotenv.config({
    path: "../../.env",
});*/

const app = express();

app.get("/", async (req, res) => {
    console.log(path.join(__dirname, await handleRoute(req.url)))
    res.sendFile(path.join(__dirname, await handleRoute(req.url)));
});

app.listen(3000, () => {
    console.log(`website is running on port ${3000}`)
});