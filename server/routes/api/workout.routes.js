const express = require('express')
const router = express.Router()
const checkAuth = require('../../middleware/checkAuth')

const workoutController = require('../../controllers/workout.controller')

// @route   GET api/workouts
// @desc    Get workouts
// @access  Public
router.get('/', checkAuth, workoutController.get_workout)

// @route   POST api/workouts
// @desc    Create new workout
// @access  Public
router.post('/create/blank', checkAuth, workoutController.create_blank_workout)

// @route   POST api/workouts
// @desc    Create new workout from template
// @access  Public
router.post('/create/source-template', checkAuth, workoutController.create_workout_from_template)

module.exports = router