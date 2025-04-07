import { MongoClient, ServerApiVersion } from 'mongodb';
import dotenv from 'dotenv'
dotenv.config();

// oh yeah migrate this to another db once it works because i just committed it to the repo (its public now so not secure)
const uri = "mongodb+srv://n9d8sa:N4ACYtKhXTfneO1f@cluster.zd2upok.mongodb.net/?retryWrites=true&w=majority&appName=cluster"; // secure in .env

export const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
   }
});

// init db
export default async function initDB() {
    try {
        await client.connect();
        console.log("connected to mongodb");

        const db = client.db("ccs");
        const connlection = db.collection("test");
        await connlection.insertOne({ test: "test" });

        const testtt = await connlection.findOne({ test: "test" });
        console.log(testtt);

        await client.db("admin").command({ ping: 1 });
    } catch (err) {
        console.error(`failed to connect to mongodb err: ${err}`);
    } finally {
        await client.close();
    }
}
