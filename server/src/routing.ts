// todo: add db support, use promises, etcetc
// preferably mongodb or something well known and established

import { redisClient } from "./db"

export default async function handleRoute(requestedPath: string): Promise<string> {
    // biome-ignore lint/suspicious/noAsyncPromiseExecutor: <explanation>
    return new Promise(async (res, rej) => {
        res(`${await redisClient.getData(requestedPath.split("/")[1], true)}`); // for now just resolve everything to basic path
    });
}