const express = require('express')
const router = express.Router()
const checkAuth = require('../../middleware/checkAuth')

const userController = require('../../controllers/user.controller')

// @route   GET api/users
// @desc    Get user profile
// @access  Public
router.get('/profile', checkAuth, userController.get_profile)

// @route   POST api/users
// @desc    Update user email
// @access  Public
router.post('/update/email', checkAuth, userController.update_email)

// @route   POST api/users
// @desc    Update user password
// @access  Public
router.post('/update/password', checkAuth, userController.update_password)

// @route   POST api/users
// @desc    Update user profile
// @access  Public
router.post('/update/profile', checkAuth, userController.update_profile_details)

// @route   DELETE api/users
// @desc    Delete user account
// @access  Public
router.delete('/delete', checkAuth, userController.delete_user)

module.exports = router