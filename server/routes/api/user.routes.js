const express = require('express')
const router = express.Router()
const checkAuth = require('../../middleware/checkAuth')

const userController = require('../../controllers/user.controller')

// @route   GET api/users
// @desc    Get user profile
// @status  Functional
router.get('/', checkAuth, userController.get_profile)

// @route   GET api/users/history
// @desc    Get user profile
// @status  Functional
router.get('/history', checkAuth, userController.get_history)

// @route   PUT api/users/update-email
// @desc    Update user email
// @status  Functional
router.put('/update-email', checkAuth, userController.update_email)

// @route   PUT api/users
// @desc    Update user password
// @status  In progress
router.put('/update-password', checkAuth, userController.update_password)

// @route   PUT api/users
// @desc    Update user profile
// @status  Functional
router.put('/update-profile', checkAuth, userController.update_profile_details)

// @route   DELETE api/users/:id
// @desc    Delete user account
// @status  In progress
router.delete('/:id', checkAuth, userController.delete_user)

module.exports = router
