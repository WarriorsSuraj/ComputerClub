/*
I wish pain and misery to all that must endure this treacherous code.
*/

import express from 'express';
import dotenv from "dotenv";
import handleRoute from './routing';
import path from "node:path";
import initDB from './db';

// help dotenv not loading .env file root directory
dotenv.config();

const app = express();

app.get("/", async (req, res) => {
    console.log(path.join(__dirname, await handleRoute(req.url)))
    res.sendFile(path.join(__dirname, await handleRoute(req.url)));
});

app.listen(3000, () => {
    console.log(`website is running on port ${3000}`)
});

// init db
initDB();