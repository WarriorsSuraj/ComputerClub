import { type RedisClientType, createClient } from 'redis';
import path from "node:path";
import { configDotenv } from 'dotenv';
import Console from '../../util/logging';

configDotenv({
    path: path.join(__dirname, "../../.env")
});

// are types needed for classes? like 'implements'? i think this is understandable enough though
// i just realized this may be really OO
export default class RedisDBManager {
    public client: RedisClientType;
    private username: string;
    private password: string;
    private host: string;
    private port: number;
    public initialized = false;

    constructor(username: string, password: string, host: string, port: number) {
        this.username = username;
        this.password = password;
        this.host = host;
        this.port = port;

        this.client = createClient({
            username: this.username,
            password: this.password,
            socket: {
                host: this.host,
                port: this.port
            }
        });


        this.client.on("error", error => this.handleInitializationError(error));

        // initialize client for use
        this.connectClient();
    }

    private async connectClient() {
        await this.client.connect();
        this.initialized = true;
    }

    private handleInitializationError(errormsg: Error) {
        Console.error("Error while initializing REDIS DB!", errormsg);
    }

    // i recommend always never using doChecks, it basically just checks if the data was correctly written by reading the db after writing
    // biome-ignore lint/suspicious/noExplicitAny: it supports all types of data (not yet but will)
    async setData(address: string, data: any, doChecks: boolean): Promise<boolean> {
        // biome-ignore lint/suspicious/noAsyncPromiseExecutor: idk how to do otherwise
        return new Promise(async (res, rej) => {
            try {
                let dayta = data;

                if (typeof data !== "string") dayta = JSON.stringify(data);

                await this.client.set(address, dayta);

                if (doChecks) {
                    let dbVal = await this.client.get(address);
                    if (typeof data !== "string") dbVal = JSON.parse(data);

                    if (dbVal === null || dbVal !== data) res(false);
                }

                res(true);
            } catch (error) {
                rej(error);
                Console.error(`Error writing data to address ${address}. data: ${data}. error: ${error}`);
            }
        })
    }

    async getData(address: string, isString: boolean) {
        let res = await this.client.get(address) ?? "";

        // later: somehow find a way to determine if data is an object, and should be parsed with json.parse automatically
        if (!isString) res = JSON.parse(res);

        return res;
    }
};

export const redisClient = new RedisDBManager("default", (process.env.REDIS_PASSWORD ?? ""), (process.env.REDIS_URL ?? ""), Number.parseInt(process.env.REDIS_PORT || "0"));

/*

const client = createClient({
    username: 'default',
    password: 'FR5qnqOg2lYCfbBUci2qXm22LPD59CrI',
    socket: {
        host: 'redis-17035.crce174.ca-central-1-1.ec2.redns.redis-cloud.com',
        port: 17035
    }
});

client.on('error', err => console.log('Redis Client Error', err));

async function exec() {
await client.connect();

await client.set('foo', 'bar');
const result = await client.get('foo');
console.log(result)  // >>> bar
}

exec();
*/