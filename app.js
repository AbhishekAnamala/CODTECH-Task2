
const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON requests
app.use(express.json());

// In-memory data store
let books = [];

// GET all books
app.get('/books', (req, res) => {
    res.json(books);
});

// GET a book by ID
app.get('/books/:id', (req, res) => {
    const { id } = req.params;
    const book = books.find(b => b.id === parseInt(id));
    if (book) {
        res.json(book);
    } else {
        res.status(404).json({ message: 'Book not found' });
    }
});

// POST a new book
app.post('/books', (req, res) => {
    const { title, author } = req.body;
    const newBook = { id: books.length + 1, title, author };
    books.push(newBook);
    res.status(201).json(newBook);
});

// PUT update a book by ID
app.put('/books/:id', (req, res) => {
    const { id } = req.params;
    const bookIndex = books.findIndex(b => b.id === parseInt(id));
    
    if (bookIndex !== -1) {
        const updatedBook = { ...books[bookIndex], ...req.body };
        books[bookIndex] = updatedBook;
        res.json(updatedBook);
    } else {
        res.status(404).json({ message: 'Book not found' });
    }
});

// DELETE a book by ID
app.delete('/books/:id', (req, res) => {
    const { id } = req.params;
    const bookIndex = books.findIndex(b => b.id === parseInt(id));
    
    if (bookIndex !== -1) {
        books.splice(bookIndex, 1);
        res.status(204).send(); // No content
    } else {
        res.status(404).json({ message: 'Book not found' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
