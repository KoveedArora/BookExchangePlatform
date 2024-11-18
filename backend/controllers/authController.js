const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ error: 'Login failed.' });
  }
};

// Logout
exports.logout = async (req, res) => {
  try {
    // There's no server-side session to destroy in JWT-based systems, but we can manage logout by:
    // 1. Frontend deletes the token (localStorage, cookies, etc.).
    // 2. Blacklist tokens on the server (for advanced setups).
    res.status(200).json({ message: 'Logged out successfully.' });
  } catch (err) {
    console.error('Error during logout:', err);
    res.status(500).json({ error: 'Logout failed.' });
  }
};

// Reset Password
exports.resetPassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    // Validate current password
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }
    const isMatch = await user.matchPassword(currentPassword);
    if (!isMatch) {
      return res.status(400).json({ error: 'Current password is incorrect.' });
    }

    // Update to new password
    user.password = newPassword;
    await user.save();

    res.status(200).json({ message: 'Password updated successfully.' });
  } catch (err) {
    console.error('Error resetting password:', err);
    res.status(500).json({ error: 'Failed to reset password.' });
  }
};

exports.register = async (req, res) => {
  console.log('Registration request received:', req.body); // Log request data
  try {
    const { name, email, password } = req.body;

    // Check if all fields are provided
    if (!name || !email || !password) {
      console.error('Validation Error: Missing fields');
      return res.status(400).json({ error: 'Name, email, and password are required.' });
    }

    // Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.error('Validation Error: Email already in use');
      return res.status(400).json({ error: 'Email is already registered.' });
    }

    // Create and save the user
    const user = new User({ name, email, password });
    await user.save();
    console.log('User registered successfully:', user);

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.status(201).json({ user: { id: user._id, name: user.name, email: user.email }, token });
  } catch (err) {
    console.error('Error during registration:', err);
    res.status(500).json({ error: 'An error occurred during registration. Please try again later.' });
  }
};