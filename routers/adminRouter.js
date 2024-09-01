const express = require('express');
const path = require('path');
const router = express.Router();
const { createUser, updateUser, deleteUser, fetchAllUsers, analyzeUsers } = require('../controller/adminController');

// Render the admin page
router.get('/', (req, res) => {
    res.render('admin');
});

// API routes for user management
router.post('/users', createUser);
router.put('/users/update', updateUser);
router.delete('/users/delete', deleteUser);
router.get('/users', fetchAllUsers);
router.get('/analyze', analyzeUsers);

module.exports = router;
