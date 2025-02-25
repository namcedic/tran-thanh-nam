import { Router, Request, Response, NextFunction } from 'express';
import {createBook, listBooks, getBookById, updateBook, deleteBook} from "../services/book.service";


const router = Router();

// Create a book
router.post(
    '/',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { title, author, description } = req.body;
            const book = await createBook({ title, author, description });
            res.status(201).json(book);
        } catch (error: any) {
            console.error('Error creating book:', error);
            next(error);
        }
    }
);

// List books with optional filters
router.get(
    '/',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { title, author } = req.query;
            const books = await listBooks({
                title: title as string,
                author: author as string,
            });
            res.json(books);
        } catch (error) {
            console.error('Error listing books:', error);
            next(error);
        }
    }
);

// Get details of a book
router.get(
    '/:id',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const book = await getBookById(id);
            if (!book) {
                res.status(404).json({ error: 'Book not found' });
                return;
            }
            res.json(book);
        } catch (error: any) {
            console.error('Error getting book:', error);
            next(error);
        }
    }
);

// Update a book
router.put(
    '/:id',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const { title, author, description } = req.body;
            const book = await updateBook(id, { title, author, description });
            if (!book) {
                res.status(404).json({ error: 'Book not found' });
                return;
            }
            res.json(book);
        } catch (error: any) {
            console.error('Error updating book:', error);
            next(error);
        }
    }
);

// Delete a book
router.delete(
    '/:id',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const success = await deleteBook(id);
            if (!success) {
                res.status(404).json({ error: 'Book not found' });
                return;
            }
            res.json({ message: 'Book deleted successfully' });
        } catch (error: any) {
            console.error('Error deleting book:', error);
            next(error);
        }
    }
);

export default router;

