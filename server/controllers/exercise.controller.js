const Exercise = require('../models/exercise.model')

const exerciseController = {
  get_exercise: async (req, res) => {
    const exercise_id = req.params.exercise_id

    const exercise = await Exercise.findById(ObjectId(exercise_id))

    if (!exercise) {
      return res.status(404).json({ message: 'exercise not found' })
    }

    return res.status(200).json(exercise)
  },
  get_all_exercises: async (req, res) => {
    const exercises = await Exercise.find()

    return res.status(200).json(exercises)
  },
  create_exercise: async (req, res) => {
    try {
      const exercise = req.body
  
      const newExercise = new Exercise({
        name: exercise.name,
        description: exercise.description,
        primary_category: exercise.primary_category,
        secondary_category: exercise.secondary_category,
        machine: exercise.machine
      })
  
      await newExercise.save()
  
      return res.status(200).json(newExercise)

    } catch (e) {
      return res.status(400).json({ message: 'exercise could not be created' })
    }
  },
  get_exercises_by_category: async (req, res) => {
    const category = req.params.category

    const exercises = Exercise.find({ primary_category: category })
    const secondary_exercises = Exercise.find({ secondary_category: category})

    if (!exercises && !secondary_exercises) {
      return res.status(404).json({ message: 'no exercises found' })
    }
    
    const all = {
      primary: exercises,
      secondary: secondary_exercises
    }

    return res.status(200).json(all)
  }
}

module.exports = exerciseController