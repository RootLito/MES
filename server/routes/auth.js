const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('./../models/users'); 

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

// Register
router.post('/register', async (req, res) => {
  const { name, username, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);

  try {
    await User.create({ name, username, password: hashed });
    res.json({ status: 'ok' });
  } catch (err) {
    res.json({ status: 'error', error: 'Duplicate username' });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (!user) return res.json({ status: 'error', error: 'User not found' });

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid)
    return res.json({ status: 'error', error: 'Incorrect password' });

  const token = jwt.sign({ id: user._id, username: user.username, name: user.name }, JWT_SECRET);
  res.json({ status: 'ok', token, name: user.name });
});


module.exports = router;
