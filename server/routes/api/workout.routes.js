const express = require('express')
const router = express.Router()
const checkAuth = require('../../middleware/checkAuth')

const workoutController = require('../../controllers/workout.controller')

// @route   GET api/workouts
// @desc    Get all workouts by user
// @status  Testing
router.get('/', checkAuth, workoutController.get_workouts_by_user)

// @route   GET api/workouts/:id
// @desc    Get workouts
// @status  Testing
router.get('/:id', checkAuth, workoutController.get_workout)

// @route   POST api/workouts/create
// @desc    Create new workout
// @status  Testing
router.post('/create', checkAuth, workoutController.create_blank_workout)

// @route   POST api/workouts/create/:id
// @desc    Create new workout from template
// @status  Testing
router.post('/create/:id', checkAuth, workoutController.create_workout_from_template)

// @route   POST api/workouts/duplicate
// @desc    Duplicate existing workout
// @status  Testing
router.post('/duplicate/:id', checkAuth, workoutController.duplicate_workout)

// @route   PUT api/workouts/:id
// @desc    Update workout
// @status  In progress
router.put('/:id', checkAuth, workoutController.update_workout_details)

// @route   PUT api/workouts/detail/:id
// @desc    Add detail to workout
// @status  In progress
router.put('/detail/:id', checkAuth, workoutController.add_exercise)

// @route   PUT api/workouts/set/:id
// @desc    Add set to detail
// @status  In progress
router.put('/set/:id', checkAuth, workoutController.add_exercise_set)

// @route   PUT api/workouts/update/set
// @desc    Update set details
// @status  In progress
router.put('/update-set/:id', checkAuth, workoutController.update_exercise_set)

// @route   PUT api/workouts/end/:id
// @desc    End workout
// @status  In progress
router.put('/end/:id', checkAuth, workoutController.end_workout)

// @route   DELETE api/workouts/:id
// @desc    Delete workout
// @status  In progress
router.delete('/:id', checkAuth, workoutController.delete_workout)

module.exports = router 