const express = require('express');
const router = express.Router();
const { verifyEmail } = require('../controllers/verifyEmailController');

router.post('/', verifyEmail);

module.exports = router;
