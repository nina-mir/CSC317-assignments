const express = require('express');
const bcrypt = require('bcryptjs');
const { createUser, findUserByUsername, findUserByEmail } = require('../db/db');

const router = express.Router();

router.get('/login', (req, res) => {
  res.render('auth/login', { title: 'Login' });
});

router.post('/login', async (req, res, next) => {
  const { username, password } = req.body;

  try {
    if (!username || !password) {
      req.session.error = 'Please provide username and password.';
      return res.redirect('/login');
    }

    const user = await findUserByUsername(username);
    if (!user) {
      req.session.error = 'Invalid username or password.';
      return res.redirect('/login');
    }

    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) {
      req.session.error = 'Invalid username or password.';
      return res.redirect('/login');
    }

    req.session.userId = user.id;
    req.session.username = user.username;
    req.session.email = user.email;

    res.redirect('/dashboard');
  } catch (err) {
    next(err);
  }
});

router.get('/register', (req, res) => {
  res.render('auth/register', { title: 'Register' });
});

router.post('/register', async (req, res, next) => {
  const { email, username, password, confirmPassword } = req.body;

  try {
    if (!email || !username || !password || !confirmPassword) {
      req.session.error = 'All fields are required.';
      return res.redirect('/register');
    }

    if (password !== confirmPassword) {
      req.session.error = 'Passwords do not match.';
      return res.redirect('/register');
    }

    if (await findUserByUsername(username)) {
      req.session.error = 'Username already taken.';
      return res.redirect('/register');
    }

    if (await findUserByEmail(email)) {
      req.session.error = 'Email already registered.';
      return res.redirect('/register');
    }

    const passwordHash = await bcrypt.hash(password, 10);

    await createUser({ username, email, passwordHash });

    req.session.success = 'Account created. Please log in.';
    res.redirect('/login');
  } catch (err) {
    next(err);
  }
});

router.post('/logout', (req, res, next) => {
  req.session.destroy(err => {
    if (err) return next(err);
    res.clearCookie('connect.sid');
    res.redirect('/login');
  });
});

module.exports = router;
