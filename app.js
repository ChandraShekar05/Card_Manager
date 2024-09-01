const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const cardRouter = require('./routers/cardRouter');
const loginRouter = require('./routers/loginRouter');
const adminRouter = require('./routers/adminRouter');

// Set up the express app
const app = express();

// Session middleware
app.use(session({
    secret: 'happiness-can-be-found-even-in-the-darkest-of-times-if-one-only-remembers-to-turn-on-the-light',
    resave: false,
    saveUninitialized: true,
}));

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'public', 'views'));

// Set up the routes
app.use('/api/cards', cardRouter);
app.use('/', loginRouter);
app.use('/admin', adminRouter);

// Set the port
const PORT = process.env.PORT || 5050;

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});