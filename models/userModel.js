const db = require('../db');

exports.registerUser = (userData) => {
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO users SET ?', userData, (err, results) => {
            if (err) return reject(err);
            resolve(results.insertId);
        });
    });
};

exports.loginUser = (credentials) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM users WHERE username = ? AND password = ?', [credentials.username, credentials.password], (err, results) => {
            if (err) return reject(err);
            resolve(results[0]);
        });
    });
};
