// src/index.ts
import express from 'express';
import bodyParser from 'body-parser';
import { initDb } from './db';
import bookRoutes from "./routes/book.routes";

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Mount the book routes at /books
app.use('/books', bookRoutes);

// A simple root endpoint
app.get('/', (req, res) => {
    res.send('Welcome to the Books API');
});

// Initialize the database and then start the server
initDb()
    .then(() => {
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    })
    .catch((error) => {
        console.error('Failed to initialize database:', error);
        process.exit(1);
    });
