const db = require('../config/db');

const loginController = async (username, password) => {
    // console.log('username:', username);
    const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
    const [rows] = await db.execute(query, [ username, password]);

    // console.log(rows);
    if (rows.length > 0) {
        return rows[0]; // Return the user if found
    } else {
        return null; // No user found
    }
};

module.exports = { loginController };
