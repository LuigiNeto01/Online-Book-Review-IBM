const db = require('../db');

const addBook = async (req, res) => {
    try {
        const { isbn, title, author } = req.body;
        const query = 'INSERT INTO books (isbn, title, author) VALUES (?, ?, ?)';
        await db.promise().query(query, [isbn, title, author]);

        res.status(201).json({ message: 'Book added successfully' });
    } catch (error) {
        console.error('Error adding book:', error);
        res.status(500).json({ error: 'Failed to add book' });
    }
};

const getBooks = async (req, res) => {
    try {
        const [booksRows] = await db.promise().query('SELECT * FROM books');

        const books = booksRows.map(book => ({
            id: book.id,
            title: book.title,
            author: book.author,
            isbn: book.isbn,
            reviews: book.review ? [book.review] : []
        }));

        res.json({ books });
    } catch (error) {
        console.error('Error fetching books:', error);
        res.status(500).json({ error: 'Failed to fetch books' });
    }
};

const getBookByISBN = async (req, res) => {
    try {
        const { ISBN } = req.body;
        const [bookRows] = await db.promise().query('SELECT * FROM books WHERE isbn = ?', [ISBN]);

        if (bookRows.length === 0) {
            return res.status(404).json({ error: 'Book not found' });
        }

        const book = bookRows[0];
        res.json(book);
    } catch (error) {
        console.error('Error fetching book by ISBN:', error);
        res.status(500).json({ error: 'Failed to fetch book by ISBN' });
    }
};

const getBooksByAuthor = async (req, res) => {
    try {
        const { author } = req.body;
        const [booksRows] = await db.promise().query('SELECT * FROM books WHERE author = ?', [author]);

        if (booksRows.length === 0) {
            return res.status(404).json({ error: 'No books found for this author' });
        }

        const books = booksRows.map(book => ({
            id: book.id,
            title: book.title,
            author: book.author,
            isbn: book.isbn,
            review: book.review
        }));

        res.json({ books });
    } catch (error) {
        console.error('Error fetching books by author:', error);
        res.status(500).json({ error: 'Failed to fetch books by author' });
    }
};

const getBooksByTitle = async (req, res) => {
    try {
        const { title } = req.body;
        const [booksRows] = await db.promise().query('SELECT * FROM books WHERE title = ?', [title]);

        if (booksRows.length === 0) {
            return res.status(404).json({ error: 'No books found with this title' });
        }

        const books = booksRows.map(book => ({
            id: book.id,
            title: book.title,
            author: book.author,
            isbn: book.isbn,
            review: book.review
        }));

        res.json({ books });
    } catch (error) {
        console.error('Error fetching books by title:', error);
        res.status(500).json({ error: 'Failed to fetch books by title' });
    }
};

const getBookReview = async (req, res) => {
    try {
        const { id } = req.params;
        const [bookRows] = await db.promise().query('SELECT review FROM books WHERE id = ?', [id]);

        if (bookRows.length === 0) {
            return res.status(404).json({ error: 'Book not found' });
        }

        const book = bookRows[0];
        res.json({ review: book.review });
    } catch (error) {
        console.error('Error fetching review for book:', error);
        res.status(500).json({ error: 'Failed to fetch review for book' });
    }
};

const addOrUpdateReview = async (req, res) => {
    try {
        const { id } = req.params;
        const { review_text } = req.body;

        const [bookRows] = await db.promise().query('SELECT * FROM books WHERE id = ?', [id]);
        if (bookRows.length === 0) {
            return res.status(404).json({ error: 'Book not found' });
        }

        await db.promise().query('UPDATE books SET review = ? WHERE id = ?', [review_text, id]);

        res.json({ message: 'Review added/updated successfully' });
    } catch (error) {
        console.error('Error adding/updating review:', error);
        res.status(500).json({ error: 'Failed to add/update review' });
    }
};

const deleteReview = async (req, res) => {
    try {
        const { id } = req.params;

        const [bookRows] = await db.promise().query('SELECT * FROM books WHERE id = ?', [id]);
        if (bookRows.length === 0) {
            return res.status(404).json({ error: 'Book not found' });
        }

        await db.promise().query('UPDATE books SET review = NULL WHERE id = ?', [id]);

        res.json({ message: 'Review deleted successfully' });
    } catch (error) {
        console.error('Error deleting review:', error);
        res.status(500).json({ error: 'Failed to delete review' });
    }
};

const getBooksAsyncCallback = (req, res) => {
    db.query('SELECT * FROM books', (err, booksRows) => {
        if (err) {
            console.error('Error fetching books:', err);
            return res.status(500).json({ error: 'Failed to fetch books' });
        }

        if (booksRows.length === 0) {
            return res.status(404).json({ error: 'Book not found' });
        }

        const books = booksRows.map(book => ({
            id: book.id,
            title: book.title,
            author: book.author,
            isbn: book.isbn,
            review: book.review
        }));

        res.json({ books });
    });
};

const searchByISBN = (req, res) => {
    const { isbn } = req.params;

    db.promise().query('SELECT * FROM books WHERE isbn = ?', [isbn])
        .then(([rows]) => {
            if (rows.length === 0) {
                return res.status(404).json({ error: 'Book not found' });
            }

            const book = rows[0];
            res.json({
                id: book.id,
                title: book.title,
                author: book.author,
                isbn: book.isbn,
                review: book.review
            });
        })
        .catch(error => {
            console.error('Error fetching book by ISBN:', error);
            res.status(500).json({ error: 'Failed to fetch book by ISBN' });
        });
};

const searchByAuthor = async (req, res) => {
    try {
        const { author } = req.params;
        const [booksRows] = await db.promise().query('SELECT * FROM books WHERE author = ?', [author]);
        const [reviewsRows] = await db.promise().query('SELECT * FROM reviews WHERE book_id IN (?)', [booksRows.map(b => b.id)]);

        const reviewsByBook = reviewsRows.reduce((acc, review) => {
            if (!acc[review.book_id]) {
                acc[review.book_id] = [];
            }
            acc[review.book_id].push(review.review);
            return acc;
        }, {});

        const books = booksRows.map(book => ({
            isbn: book.id,
            title: book.title,
            reviews: reviewsByBook[book.id] || []
        }));

        res.json({ books });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch books by author' });
    }
};

const searchByTitle = async (req, res) => {
    try {
        const { title } = req.params;
        const [booksRows] = await db.promise().query('SELECT * FROM books WHERE title = ?', [title]);
        const [reviewsRows] = await db.promise().query('SELECT * FROM reviews WHERE book_id IN (?)', [booksRows.map(b => b.id)]);

        const reviewsByBook = reviewsRows.reduce((acc, review) => {
            if (!acc[review.book_id]) {
                acc[review.book_id] = [];
            }
            acc[review.book_id].push(review.review);
            return acc;
        }, {});

        const books = booksRows.map(book => ({
            isbn: book.id,
            title: book.title,
            reviews: reviewsByBook[book.id] || []
        }));

        res.json({ books });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch books by title' });
    }
};

module.exports = {
    addBook,
    getBooks,
    getBookByISBN,
    getBooksByAuthor,
    getBooksByTitle,
    getBookReview,
    addOrUpdateReview,
    deleteReview,
    getBooksAsyncCallback,
    searchByISBN,
    searchByAuthor,
    searchByTitle
};
