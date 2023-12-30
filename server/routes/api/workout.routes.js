const express = require('express')
const router = express.Router()
const checkAuth = require('../../middleware/checkAuth')

const workoutHandlers = require('../../controllers/workout.controller')

// @route   GET api/workouts
// @desc    Get workouts
// @access  Public
router.get('/', checkAuth, workoutHandlers.get_workout)

// @route   POST api/workouts
// @desc    Create new workout
// @access  Public
router.post('/create', checkAuth, workoutHandlers.create_workout)