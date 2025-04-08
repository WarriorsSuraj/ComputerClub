import express from 'express';
import dotenv from "dotenv";
import handleRoute from './routing';
import path from "node:path";
import { configDotenv } from 'dotenv';
import { redisClient } from './db';

configDotenv({
    path: path.join(__dirname, "../../.env")
});

// help dotenv not loading .env file root directory
dotenv.config();

const app = express();

app.get("/", async (req, res) => {
    console.log(path.join(__dirname, await handleRoute(req.url)))
    res.sendFile(path.join(__dirname, await handleRoute(req.url)));
});

app.listen(process.env.PORT, () => {
    console.log(`website is running on port ${process.env.PORT}`)
});

console.log(process.env.REDIS_URL, process.env.REDIS_PASSWORD)

// db test
// the below test works, uncomment it and it should log the object properties in the terminal

setTimeout(() => {
    redisClient.setData("testing", {
        testingval: "okok1231",
        shouldwork: 111
    }, false);

    setTimeout(async () => {
        const a = await redisClient.getData("testing", false);
        console.log(a, a.testingval, a.shouldwork);
    });
}, 2000)





