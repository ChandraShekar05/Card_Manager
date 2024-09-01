const db = require('../config/db');

const registerController = async (username , password) => {
    const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
    await db.execute(query, [username, password]);
    return true;
};

module.exports = { registerController };
