# Online Book Review API - IBM Project

Welcome to the Online Book Review API, an API designed as part of an IBM project to manage book data and user reviews. This API allows users to search for books, add or update reviews, and manage user registrations.

## Features

- **Book Management:**
  - Get a list of all books
  - Search books by ISBN
  - Search books by author
  - Search books by title

- **Review Management:**
  - Add or update a review for a specific book
  - Delete a review for a specific book

- **User Management:**
  - Register a new user
  - Login with registered user credentials

## Endpoints

### Books

- **GET /api/v1/books**: Retrieve all books using an async callback function.
- **GET /api/v1/books/isbn/:isbn**: Search for a book by its ISBN (using Promises).
- **GET /api/v1/books/author/:author**: Search for books by the author's name.
- **GET /api/v1/books/title/:title**: Search for books by the title.
- **PUT /api/v1/books/:id/reviews**: Add or update a review for a specific book.
- **DELETE /api/v1/books/:id/reviews**: Delete a review for a specific book.

### Users

- **POST /api/auth/register**: Register a new user.
- **POST /api/auth/login**: Login with user credentials.

## Installation

To run this API locally, follow these steps:

1. **Clone the repository:**

       git clone https://github.com/LuigiNeto01/Online-Book-Review-IBM.git
       cd Online-Book-Review-IBM
Install dependencies:
npm install

Set up the database:

Ensure you have MySQL installed and running.

Create a new database and the required tables by running the following SQL commands:

sql
Copiar código

    CREATE DATABASE Library;

    USE Library;
    
    CREATE TABLE books (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255),
        author VARCHAR(255),
        isbn VARCHAR(13),
        review TEXT
    );
    
    CREATE TABLE users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) UNIQUE,
        password VARCHAR(255)
    );
Configure environment variables:

Create a .env file in the root of the project.
Add the following variables:
env:

    DB_HOST=localhost
    
    DB_USER=your_mysql_user
    
    DB_PASSWORD=your_mysql_password
    
    DB_NAME=Library
    
Start the server:
  node server.js
    > The server will be running on http://localhost:3000.

Usage
  You can interact with the API using tools like Postman or any other API client.

Contributing
  Contributions are welcome! Please feel free to submit a Pull Request.

License
  This project is licensed under the MIT License.

Contact
  If you have any questions, feel free to reach out via the repository's issue tracker.
