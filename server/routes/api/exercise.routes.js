const express = require('express')
const router = express.Router()
const checkAuth = require('../../middleware/checkAuth')

const exerciseController = require('../../controllers/exercise.controller')

// @route   GET api/exercises/exercise_id=
// @desc    Get single exercise by id
// @access  Public
router.get('/', exerciseController.get_exercise)

// @route   GET api/exercises
// @desc    Get all exercises
// @access  Public
router.get('/all', exerciseController.get_all_exercises)

// @route   GET api/exercises/category=
// @desc    Get exercises by category
// @access  Public
router.get('/filter', exerciseController.get_exercises_by_category)

// @route   POST api/exercises
// @desc    Create new exercise
// @access  Public
router.post('/create', checkAuth, exerciseController.create_exercise)

// NOTE: UPDATE SHOULD CONSIDER GLOBAL VS. LOCAL CHANGES

// @route   POST api/exercises
// @desc    Update exercise category
// @access  Public
router.post('/update', checkAuth, exerciseController.update_exercise)

module.exports = router