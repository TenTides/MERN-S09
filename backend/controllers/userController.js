const User = require('../models/userModel'); // Adjust the path as necessary
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const sendVerificationEmail = require('../utils/sendVerificationEmail'); // Adjust the path as necessary

const getUsers = async (req, res) => {
    try {
        const users = await User.find({}); // Fetch all users
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error: error.message });
    }
};

const getUser = async (req, res) => {
    // Logic to get a single user by ID
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
        const verificationUrl = `${baseUrl}/api/verify-email?token=${verificationToken}`;
        const emailSubject = 'Verify Your Email';
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


module.exports = {
    createUser,
    getUser,
    getUsers,
    deleteUser,
    updateUser
};
