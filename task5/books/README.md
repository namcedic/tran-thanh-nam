# Books API

A simple CRUD API for managing books using Express.js, TypeScript, and MongoDB.

## Prerequisites

- Node.js (v14 or higher)
- MongoDB installed and running locally
- npm or yarn package manager

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/namcedic/tran-thanh-nam
    cd tran-thanh-nam/task5/books
    ```

2. Install dependencies:**
    ```bash
    npm install
    ```

3. Start MongoDB using Docker Compose:**
    ```bash
    docker-compose up -d
    ```

4. Start the server in development mode:**
    ```bash
    npm run dev
    ```
5. Start the server in production mode:**
    ```bash
    npm run build
    npm start
    ```

## API Endpoints
- POST /api/books - Create a new book
- GET /api/books - Get all books
- GET /api/books/:id - Get a specific book
- PUT /api/books/:id - Update a book
- DELETE /api/books/:id - Delete a book

