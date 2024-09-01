const db = require('../config/db');

// Create a new user
const createUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        await db.execute('INSERT INTO users (username, password) VALUES (?, ?)', [username, password]);
        res.status(200).send('User created');
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).send('Internal Server Error');
    }
};

// Update an existing user
const updateUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        await db.execute('UPDATE users SET password = ? WHERE username = ?', [password, username]);
        res.status(200).send('User updated');
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).send('Internal Server Error');
    }
};

// Delete a user
const deleteUser = async (req, res) => {
    const { username } = req.body;
    try {
        await db.execute('DELETE FROM users WHERE username = ?', [username]);
        res.status(200).send('User deleted');
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).send('Internal Server Error');
    }
};

// Get all users
const fetchAllUsers = async (req, res) => {
    try {
        const [users] = await db.execute('SELECT * FROM users');
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).send('Internal Server Error');
    }
};

// Get statistics
const analyzeUsers = async (req, res) => {
    try {
        const [users] = await db.execute('SELECT COUNT(*) AS totalUsers FROM users');
        const [cards] = await db.execute('SELECT COUNT(*) AS totalCards FROM cards');
        
        res.json({
            totalUsers: users[0].totalUsers,
            totalCards: cards[0].totalCards
        });
    } catch (error) {
        console.error('Error fetching statistics:', error);
        res.status(500).send('Internal Server Error');
    }
};

module.exports = { createUser, updateUser, deleteUser, fetchAllUsers, analyzeUsers};
