
const db = require('../db');

const registerUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        await db.promise().query('INSERT INTO users (username, password) VALUES (?, ?)', [username, password]);

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Failed to register user' });
    }
};
const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        const [users] = await db.promise().query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password]);

        if (users.length > 0) {
            res.json({ message: 'Login successful' });
        } else {
            res.status(401).json({ error: 'Invalid username or password' });
        }
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ error: 'Failed to login user' });
    }
};
module.exports = {
    registerUser,
    loginUser,
};
