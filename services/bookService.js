const bookModel = require('../models/bookModel');

exports.getBooks = async () => {
    return await bookModel.getAllBooks();
};

exports.getBookByISBN = async (isbn) => {
    return await bookModel.getBookByISBN(isbn);
};

exports.getBooksByAuthor = async (author) => {
    return await bookModel.getBooksByAuthor(author);
};

exports.getBooksByTitle = async (title) => {
    return await bookModel.getBooksByTitle(title);
};

exports.getBookReview = async (isbn) => {
    return await bookModel.getBookReview(isbn);
};

exports.addOrUpdateReview = async (isbn, review) => {
    return await bookModel.addOrUpdateReview(isbn, review);
};

exports.deleteReview = async (isbn) => {
    return await bookModel.deleteReview(isbn);
};
