const express = require('express')
const router = express.Router()
const userController = require('../../controllers/user.controller')

// @route   POST api/users
// @desc    Login user
// @access  Public
router.post('/login', userController.login)

// @route   POST api/users
// @desc    Register new user
// @access  Public
router.post('/register', userController.register)

module.exports = router