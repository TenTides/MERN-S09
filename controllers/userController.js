const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const sendVerificationEmail = require('../utils/sendVerificationEmail');
const ObjectId = mongoose.Types.ObjectId;


const getUsers = async (req, res) => {
    try {
        const users = await User.find({}); // Fetch all users
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error: error.message });
    }
};

const getUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findOne({_id : ObjectId(id)}); // Fetch all users
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error: error.message });
    }
};

const createUser = async (req, res) => {
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
        const user = new User({
            email,
            password: hashedPassword,
            verificationToken,
            emailVerified: false
        });
        await user.save();

        // Send a verification email
        const baseUrl = process.env.BASE_URL; // Make sure this is in .env file
        const verificationUrl = `${baseUrl}verify/?token=${verificationToken}`;
        const emailSubject = 'Verify Your Email for POOSD.COM';
        const emailText = `Please verify your email by clicking on this link: ${verificationUrl}`;
        const emailHtml = `<strong>Please verify your email by clicking on this link:</strong> <a href="${verificationUrl}">Verify Email</a>`;

        sendVerificationEmail(user.email, emailSubject, emailText, emailHtml);

        res.status(200).json({ message: 'Signup successful! Please check your email.' });
    } catch (error) {
        res.status(500).json({ message: 'Error signing up new user', error: error.message });
    }
};

const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error: error.message });
    }
};

const updateUser = async (req, res) => {
    // Logic to update a user's details
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        if (!user.emailVerified) {
            return res.status(403).json({ message: 'Please verify your email first' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: user._id, email },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        // Store user ID in the session
        req.session.userId = user._id;

        // Send response with JWT token
        res.status(200).json({
            message: 'Login successful',
            token
        });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error: error.message });
    }
};

module.exports = {
    createUser,
    getUser,
    getUsers,
    deleteUser,
    updateUser,
    loginUser
};
