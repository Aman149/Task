const express = require('express');
const bcrypt = require('bcryptjs');
const { User } = require('../db');
const { authenticateJwt, signToken } = require('../middleware/auth');

const router = express.Router();

const issueToken = (user) =>
  signToken({ id: user._id.toString(), username: user.username });

router.post('/signup', async (req, res) => {
  try {
    const { username, password } = req.body || {};
    if (!username || !password) {
      return res.status(400).json({ msg: 'Username and password are required' });
    }
    if (password.length < 6) {
      return res.status(400).json({ msg: 'Password must be at least 6 characters' });
    }
    const existing = await User.findOne({ username });
    if (existing) {
      return res.status(409).json({ msg: 'User already exists' });
    }
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ username, password: hash });
    const token = await issueToken(user);
    res.status(201).json({ message: 'User created successfully', token, username: user.username });
  } catch (err) {
    console.error('signup error', err);
    res.status(500).json({ msg: 'Internal server error' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body || {};
    if (!username || !password) {
      return res.status(400).json({ msg: 'Username and password are required' });
    }
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ msg: 'Invalid username or password' });
    }
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
      return res.status(401).json({ msg: 'Invalid username or password' });
    }
    const token = await issueToken(user);
    res.json({ message: 'Logged in successfully', token, username: user.username });
  } catch (err) {
    console.error('login error', err);
    res.status(500).json({ msg: 'Internal server error' });
  }
});

router.get('/me', authenticateJwt, async (req, res) => {
  const user = await User.findById(req.user.id).select('username');
  if (!user) return res.status(404).json({ msg: 'User not found' });
  res.json({ username: user.username });
});

module.exports = router;
