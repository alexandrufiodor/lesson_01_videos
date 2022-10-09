import {MongoClient} from "mongodb";
import {blogsType} from "./blogs-repository";
import {postsType} from "./posts-repository";
import * as mongoose from "mongoose";

const mongoUri = 'mongodb+srv://admin:DjdF0RnhOaJ2oFsT@cluster0.5enq2df.mongodb.net/test';

export const client = new MongoClient(mongoUri);
const db = client.db("ht_03")
export const blogsCollection = db.collection<any>('blogs')
export const postsCollection = db.collection<any>('posts')


export async function runDb() {
    try {
        await client.connect();
        await db.command({ping: 1});
        console.log("Connected successfully to mongo server");
    } catch {
        await client.close()
    }
}
