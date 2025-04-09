import express from 'express';
import handleRoute from './routing';
import path from "node:path";
import { configDotenv } from 'dotenv';
import { redisClient } from './db';

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
            res.sendFile(path.join(__dirname, "../", "../", req.url));
        }
    } catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
});

app.listen(process.env.PORT, () => {
    console.log(`website is running on port ${process.env.PORT}`)
});

// db test
// the below test works, uncomment it and it should log the object properties in the terminal

setTimeout(() => {
    redisClient.setData("testing", "../../index.html", false);
    redisClient.setData("test", "../../public/dist/pages/example/index.html", false);

    setTimeout(async () => {
        const a = await redisClient.getData("testing", true);
        console.log("sadsd ", path.join(__dirname, a));
    });
}, 2000)
