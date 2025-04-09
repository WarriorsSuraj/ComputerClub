import express from 'express';
import handleRoute from './routing';
import path from "node:path";
import { configDotenv } from 'dotenv';
import { redisClient } from './db';
import Console from '../util/logging';

const app = express();
configDotenv({
    path: path.join(__dirname, "../../.env")
});
//app.use(express.static('public'));

// https://expressjs.com/en/guide/migrating-5.html#path-syntax
app.get("/{*splat}", async (req, res) => {
    try {
        // check if it's in the db, if not then we know its an asset/resource that the page needs
        const dbValue = await redisClient.getData(req.url.split("/")[1], true);
        if (dbValue) {
            // means it's a file
            const pathToFile = await handleRoute(req.url);
            res.sendFile(path.join(__dirname, pathToFile));
        } else {
            res.sendFile(path.join(__dirname, "../", "../", "public/dist", req.url));
        }
    } catch (err) {
        Console.error("Error while routing!", err);
        res.sendStatus(400);
    }
});

app.listen(process.env.PORT, () => {
    Console.log(`Website is running on PORT ${process.env.PORT}!`)
});

// db test
// the below test works, uncomment it and it should log the object properties in the terminal

/*
setTimeout(() => {
    redisClient.setData("testing", "../../index.html", false);
    redisClient.setData("test", "../../public/dist/pages/example/index.html", false);
    redisClient.setData("game", "../../public/dist/pages/projects/game-engine/index.html", false);

    setTimeout(async () => {
        const a = await redisClient.getData("testing", true);
        console.log("sadsd ", path.join(__dirname, a));
    });
}, 2000)
*/