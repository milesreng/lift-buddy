const express = require('express')
const router = express.Router()
const checkAuth = require('../../middleware/checkAuth')

const workoutController = require('../../controllers/workout.controller')

// @route   GET api/workouts
// @desc    Get all workouts by user
// @status  Functional
router.get('/', checkAuth, workoutController.get_workouts_by_user)

// @route   GET api/workouts/:id
// @desc    Get workouts
// @status  Functional
router.get('/:id', checkAuth, workoutController.get_workout)

// @route   POST api/workouts/create
// @desc    Create new workout
// @status  Functional
router.post('/', checkAuth, workoutController.create_blank_workout)

// @route   POST api/workouts/template/:id
// @desc    Create new workout from template
// @status  Functional
router.post('/:id', checkAuth, workoutController.create_workout_from_template)

// @route   POST api/workouts/duplicate/:id
// @desc    Duplicate existing workout
// @status  Testing
router.post('/duplicate/:id', checkAuth, workoutController.duplicate_workout)

// @route   PATCH api/workouts/:id
// @desc    Update workout
// @status  In progress
router.patch('/:id', checkAuth, workoutController.update_workout_details)

// @route   PATCH api/workouts/:id/detail
// @desc    Add detail to workout
// @status  Functional
router.patch('/:id/detail', checkAuth, workoutController.add_workout_detail)

// @route   PATCH api/workouts/:id/set
// @desc    Add set to detail
// @status  Functional
router.patch('/:id/set', checkAuth, workoutController.add_exercise_set)

// @route   PATCH api/workouts/update/:id/set
// @desc    Update set details
// @status  In progress
router.patch('/update/:id/set', checkAuth, workoutController.update_exercise_set)

// @route   PATCH api/workouts/end/:id
// @desc    End workout
// @status  In progress
router.patch('/:id/end', checkAuth, workoutController.end_workout)

// @route   DELETE api/workouts/:id
// @desc    Delete workout
// @status  In progress
router.delete('/:id', checkAuth, workoutController.delete_workout)

module.exports = router 