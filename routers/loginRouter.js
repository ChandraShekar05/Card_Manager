const express = require('express');
const { loginController } = require('../controller/loginController');
const { registerController } = require('../controller/registerController');

const router = express.Router();

// Render the login page
router.get('/', (req, res) => {
    res.render('login');
});

// Handle the login route
router.post('/', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await loginController(username, password);
        if (user) {
            req.session.user = { username }; // Save user info in the session
            if (username === 'chandrashekar_Admin' && password === 'chandrashekar') {
                res.render('admin');
                // res.send('Admin logged in');
            } else {
                res.render('index');
                // res.send('User logged in');
            }
        } else {
            res.redirect('/register');
            // res.send('User not found');
        }
    } catch (error) {
        console.error('Error while logging in:', error.message);
        res.status(500).send('Internal Server Error');
    }
});

// Render the register page
router.get('/register', (req, res) => {
    // res.send('Register page');
    res.render('register');
});

// Handle the register route
router.post('/register', async (req, res) => {
    const { username , password } = req.body;
    try {
        await registerController( username, password);
        req.session.user = { username }; // Save user info in the session
        res.render('index');
        // res.send('User created');
    } catch (error) {
        console.error('Error while registering:', error.message);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
