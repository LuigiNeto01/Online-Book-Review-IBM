const db = require('../sdb');

exports.getAllBooks = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM books', (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};

exports.getBookByISBN = (isbn) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM books WHERE isbn = ?', [isbn], (err, results) => {
            if (err) return reject(err);
            resolve(results[0]);
        });
    });
};

exports.getBooksByAuthor = (author) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM books WHERE author = ?', [author], (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};

exports.getBooksByTitle = (title) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM books WHERE title = ?', [title], (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};

exports.getBookReview = (isbn) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT review FROM books WHERE isbn = ?', [isbn], (err, results) => {
            if (err) return reject(err);
            resolve(results[0]);
        });
    });
};

exports.addOrUpdateReview = (isbn, review) => {
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO books (isbn, review) VALUES (?, ?) ON DUPLICATE KEY UPDATE review = ?', [isbn, review, review], (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};

exports.deleteReview = (isbn) => {
    return new Promise((resolve, reject) => {
        db.query('UPDATE books SET review = NULL WHERE isbn = ?', [isbn], (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};
