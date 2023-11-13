const express = require('express');
const router = express.Router();
const { signupUser } = require('../controllers/signupController');

// Register a new user
router.post('/', signupUser);

module.exports = router;
