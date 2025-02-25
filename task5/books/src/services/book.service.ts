import { Db, ObjectId } from 'mongodb';
import { getDb } from '../db';

export interface Book {
    _id?: ObjectId;
    title: string;
    author: string;
    description?: string;
    createdAt: string;
    updatedAt: string;
}

export async function createBook(data: Partial<Book>): Promise<Book> {
    const db: Db = getDb();
    const collection = db.collection<Book>('books');
    const now = new Date().toISOString();

    // Validate required fields
    if (!data.title || !data.author) {
        throw new Error('Title and Author are required');
    }

    const book: Book = {
        title: data.title,
        author: data.author,
        description: data.description || '',
        createdAt: now,
        updatedAt: now,
    };

    const result = await collection.insertOne(book);
    // Using findOne with generics
    const inserted = await collection.findOne({ _id: result.insertedId });
    if (!inserted) {
        throw new Error('Failed to retrieve inserted book');
    }
    return inserted;
}

export async function listBooks(filter: { title?: string; author?: string } = {}): Promise<Book[]> {
    const db: Db = getDb();
    const collection = db.collection<Book>('books');
    let query: any = {};

    if (filter.title) {
        query.title = { $regex: filter.title, $options: 'i' };
    }
    if (filter.author) {
        query.author = { $regex: filter.author, $options: 'i' };
    }

    // Use generics for find() so the result is Book[]
    return await collection.find<Book>(query).toArray();
}

export async function getBookById(id: string): Promise<Book | null> {
    const db: Db = getDb();
    const collection = db.collection<Book>('books');
    try {
        // Use generics for findOne()
        return await collection.findOne<Book>({ _id: new ObjectId(id) });
    } catch (err) {
        throw new Error('Invalid book ID');
    }
}

export async function updateBook(id: string, data: Partial<Book>): Promise<Book | null> {
    const db: Db = getDb();
    const collection = db.collection<Book>('books');
    const existing = await getBookById(id);
    if (!existing) {
        return null;
    }

    const updatedData: Partial<Book> = {
        title: data.title || existing.title,
        author: data.author || existing.author,
        description: data.description !== undefined ? data.description : existing.description,
        updatedAt: new Date().toISOString(),
    };

    await collection.updateOne({ _id: new ObjectId(id) }, { $set: updatedData });
    return await getBookById(id);
}

export async function deleteBook(id: string): Promise<boolean> {
    const db: Db = getDb();
    const collection = db.collection<Book>('books');
    const existing = await getBookById(id);
    if (!existing) return false;
    await collection.deleteOne({ _id: new ObjectId(id) });
    return true;
}
