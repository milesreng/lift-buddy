const express = require('express')
const router = express.Router()
const checkAuth = require('../../middleware/checkAuth')

const workoutController = require('../../controllers/workout.controller')

// @route   GET api/workouts
// @desc    Get workouts
// @access  Public
router.get('/', checkAuth, workoutController.get_workout)

// @route   GET api/workouts/all
// @desc    Get all workouts by user
// @access  Public
router.get('/all', checkAuth, workoutController.get_workouts_by_user)

// @route   POST api/workouts
// @desc    Create new workout
// @access  Public
router.post('/create/blank', checkAuth, workoutController.create_blank_workout)

// @route   POST api/workouts
// @desc    Create new workout from template
// @access  Public
router.post('/create/source', checkAuth, workoutController.create_workout_from_template)

// @route   POST api/workouts/update
// @desc    Update workout
// @access  Public
router.post('/update', checkAuth, workoutController.update_workout_details)

// @route   POST api/workouts/add/detail
// @desc    Add detail to workout
// @access  Public
router.post('/add/detail', checkAuth, workoutController.add_exercise)

// @route   POST api/workouts/add/set
// @desc    Add set to detail
// @access  Public
router.post('/add/set', checkAuth, workoutController.add_exercise_set)

// @route   POST api/workouts/add/set
// @desc    Update set details
// @access  Public
router.post('/update/set', checkAuth, workoutController.update_exercise_set)

// @route   DELETE api/workouts
// @desc    Delete workout
// @access  Public
router.delete('/', checkAuth, workoutController.delete_workout)

module.exports = router 