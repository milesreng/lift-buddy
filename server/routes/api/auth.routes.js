const express = require('express')
const router = express.Router()
const userController = require('../../controllers/user.controller')

// @route   POST api/users
// @desc    Login user
// @status  Functional
router.post('/login', userController.login)

// @route   POST api/users
// @desc    Register new user
// @status  Functional
router.post('/register', userController.register)

module.exports = router