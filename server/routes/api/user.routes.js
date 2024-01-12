const express = require('express')
const router = express.Router()
const checkAuth = require('../../middleware/checkAuth')

const userController = require('../../controllers/user.controller')

// @route   GET api/users
// @desc    Get user profile
// @status  Functional
router.get('/', checkAuth, userController.get_profile)

// @route   POST api/users
// @desc    Update user email
// @status  In progress
router.patch('/update-email', checkAuth, userController.update_email)

// @route   POST api/users
// @desc    Update user password
// @status  In progress
router.patch('/update-password', checkAuth, userController.update_password)

// @route   POST api/users
// @desc    Update user profile
// @status  In progress
router.patch('/update-profile', checkAuth, userController.update_profile_details)

// @route   DELETE api/users
// @desc    Delete user account
// @status  In progress
router.delete('/delete', checkAuth, userController.delete_user)

module.exports = router