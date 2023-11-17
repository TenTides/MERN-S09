const express = require('express');
const {
    createUser,
    getUser,
    getUsers,
    deleteUser,
    updateUser
} = require('../controllers/userController');

const router = express.Router();

// Get all users
router.get('/', getUsers);

// Get single user
router.get('/:id', getUser);

// Create new user
router.post('/', createUser);

// Delete user
router.delete('/:id', deleteUser);

// Update user
router.patch('/:id', updateUser);


module.exports = router;
