const express = require('express');
const { login, register, logout, resetPassword } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();
router.post('/register', register); // Register route
router.post('/login', login);
router.post('/logout', logout);
router.post('/reset-password', authMiddleware, resetPassword); // Add Reset Password Route
module.exports = router;