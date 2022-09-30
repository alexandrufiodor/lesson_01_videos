import {MongoClient} from "mongodb";
import {blogsType} from "./blogs-repository";
import {postsType} from "./posts-repository";

const mongoUri = "mongodb+srv://admin:<qwerty123>@cluster0.5enq2df.mongodb.net/test";

export const client = new MongoClient(mongoUri);
const db = client.db("test")
export const blogsCollection = db.collection<blogsType>('blogs')
export const postsCollection = db.collection<postsType>('posts')

export async function runDb() {
    try {
        await client.connect();
        await db.command({ping: 1});
        console.log("Connected successfully to mongo server");
    } catch {
        await client.close()
    }
}
