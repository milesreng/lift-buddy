const express = require('express')
const router = express.Router()
const checkAuth = require('../../middleware/checkAuth')

const userHandlers = require('../../controllers/user.controller')

// @route   GET api/users
// @desc    Get user profile
// @access  Public
router.get('/profile', checkAuth, userHandlers.get_profile)

// @route   POST api/users
// @desc    Update user email
// @access  Public
router.post('/update/email', checkAuth, userHandlers.update_email)

// @route   POST api/users
// @desc    Update user password
// @access  Public
router.post('/update/password', checkAuth, userHandlers.update_password)

// @route   POST api/users
// @desc    Update user profile
// @access  Public
router.post('/update/profile', checkAuth, userHandlers.update_profile_details)

// @route   DELETE api/users
// @desc    Delete user account
// @access  Public
router.delete('/delete', checkAuth, userHandlers.delete_user)

module.exports = router