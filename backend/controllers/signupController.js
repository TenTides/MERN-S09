// controllers/signupController.js
const User = require('../models/userModel');
const sendVerificationEmail = require('../utils/sendVerificationEmail');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

const signupUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Generate a verification token
    const verificationToken = uuidv4();

    // Create and save the user
    const user = new User({ email, password: hashedPassword, verificationToken, emailVerified: false });
    await user.save();

    // Send a verification email
    sendVerificationEmail(user.email, verificationToken);

    res.status(200).json({ message: 'Signup successful! Please check your email.' });
  } catch (error) {
    res.status(500).json({ message: 'Error signing up new user', error: error.message });
  }
};

module.exports = { signupUser };
