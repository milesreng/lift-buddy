const express = require('express')
const router = express.Router()
const userHandlers = require('../../controllers/user.controller')

// @route   POST api/users
// @desc    Login user
// @access  Public
router.post('/login', userHandlers.login)

// @route   POST api/users
// @desc    Register new user
// @access  Public
router.post('/register', userHandlers.register)

module.exports = router