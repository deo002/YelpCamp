const express = require('express');
const router = express.Router();
const User = require('../model/user');
const catchAsync = require('../utils/catchAsync');
const passport = require('passport');
const { renderRegisterForm, register, renderLoginForm, login, logout } = require('../controllers/user');

router.get('/register', renderRegisterForm);

router.post('/register', catchAsync(register));

router.get('/login', renderLoginForm);

router.post('/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), login);

router.get('/logout', logout);

module.exports = router;