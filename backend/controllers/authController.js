const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

async function register(req, res) {
    try {
        const { username, email, password } = req.body;
        const user = new User({ username, email, password });
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to create user' });
    }
}

async function login(req, res) {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Failed to login' });
    }
}

async function logout(req, res) {
    try {
        res.clearCookie('token');
        res.json({ message: 'Logged out successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to logout' });
    }
}

module.exports = { register, login, logout };