const express = require('express')
const router = express.Router()
const checkAuth = require('../../middleware/checkAuth')

const exerciseController = require('../../controllers/exercise.controller')

// @route   GET api/exercises
// @desc    Get all exercises
// @status  Testing
router.get('/', exerciseController.get_all_exercises)

// @route   GET api/exercises/:id
// @desc    Get single exercise by id
// @status  Testing
router.get('/:id', exerciseController.get_exercise)

// @route   GET api/exercises/:category
// @desc    Get exercises by category
// @status  Not started
router.get('/:category', exerciseController.get_exercises_by_category)

// @route   POST api/exercises
// @desc    Create new exercise
// @status  Testing
router.post('/', checkAuth, exerciseController.create_exercise)

// @route   PUT api/exercises/:id
// @desc    Update exercise category 
//            - Users should not be able to edit exercises if they did not create them.
// @status  Testing
router.put('/:id', checkAuth, exerciseController.update_exercise)

// @route   DELETE api/exercises/:id
// @desc    Update exercise category
// @status  Not started
router.delete('/:id', checkAuth, exerciseController.update_exercise)

module.exports = router