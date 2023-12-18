const express = require('express')
const router = express.Router()

const Exercise = require('../../models/exercise.model')

// @route   GET api/exercises/test
// @desc    Test exercise route
// @access  Public
router.get('/test', (req, res) => res.send('exercise route testing'))

// @route   GET api/exercises
// @desc    Get all exercises
// @access  Public
router.get('/', (req, res) => {
  Exercise.find()
    .then(exercises => res.json(exercises))
    .catch(err => res.status(404).json({ comment: 'no exercises found' }))
})

// @route   GET api/exercises/:id
// @desc    Get single exercise by id
// @access  Public
router.get('/:id', (req, res) => {
  Exercise.findById(req.params.id)
    ,then(exercise => res.json(exercise))
    .catch(err => res.status(404).json({ comment: 'exercise not found' }))
})



module.exports = router