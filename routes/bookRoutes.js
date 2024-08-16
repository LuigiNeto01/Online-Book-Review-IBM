const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

// Get all books
router.get('/books', bookController.getBooks);
router.post('/books', bookController.addBook);

// Get book by ISBN
router.get('/books/:isbn', bookController.getBookByISBN);
router.post('/books/byISBN', bookController.getBookByISBN);

// Get books by author
router.get('/books/author/:author', bookController.getBooksByAuthor);
router.post('/books/byAuthor', bookController.getBooksByAuthor);

// Get books by title
router.get('/books/title/:title', bookController.getBooksByTitle);
router.post('/books/byTitle', bookController.getBooksByTitle);

// Get book review
router.get('/books/review/:isbn', bookController.getBookReview);
router.post('/books/review/:isbn', bookController.getBookReview);

// Add or update book review
router.get('/v1/books/:id/reviews', bookController.getBookReview);
router.put('/v1/books/:id/reviews', bookController.addOrUpdateReview);

// Delete book review
router.delete('/v1/books/:id/reviews', bookController.deleteReview);

// Get all books using async callback
router.get('/books/callback', bookController.getBooksAsyncCallback);

// Search by ISBN
router.get('/books/search/isbn/:isbn', bookController.searchByISBN);

// Search by author
router.get('/books/search/author/:author', bookController.searchByAuthor);

// Search by title
router.get('/books/search/title/:title', bookController.searchByTitle);



module.exports = router;
