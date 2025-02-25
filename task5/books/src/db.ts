import { MongoClient, Db } from 'mongodb';

let db: Db;
let client: MongoClient;

export async function initDb() {
    const uri = process.env.MONGO_URI || 'mongodb://localhost:27017';
    client = new MongoClient(uri);
    await client.connect();
    db = client.db('book_data');
    console.log("Connected to MongoDB");
    return db;
}

export function getDb() {
    if (!db) {
        throw new Error("Database not initialized. Call initDb() first.");
    }
    return db;
}
