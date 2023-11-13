// controllers/verifyEmailController.js
const User = require('../models/userModel'); // Adjust the path as necessary

const verifyEmail = async (req, res) => {
  const { token } = req.body;
  try {
    const user = await User.findOne({ verificationToken: token });
    if (!user) {
      return res.status(404).json({ message: 'Invalid or expired token' });
    }

    user.emailVerified = true;
    user.verificationToken = null; // Clear the verification token
    await user.save();

    res.status(200).json({ message: 'Email verified successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error verifying email', error: error.message });
  }
};

module.exports = { verifyEmail };
