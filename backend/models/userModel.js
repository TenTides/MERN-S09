const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: false
  },
  password: {
    type: String,
    required: [true, 'Password is required']
  },
  verificationToken: String,
  emailVerified: {
    type: Boolean,
    default: false
  }
});

// Method to compare given password with hashed password
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
