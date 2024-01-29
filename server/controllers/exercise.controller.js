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
    
    const primary = await Exercise.find({ primary_category: category })

    if (!primary) {
      return res.status(404).json({ message: 'no exercises found' })
    }

    return res.status(200).json({ primary })
  },
  update_exercise: async (req, res) => {
    try {
      const exercise_id = req.params.exercise_id
      const details = req.body

      const updateExercise = await Exercise.findById(ObjectId(exercise_id))

      if (!updateExercise) {
        return res.status(404).json({ message: 'exercise not found' })
      }

      if (details.primary) {
        updateExercise.primary_category = details.primary
      }

      if (details.secondary) {
        updateExercise.secondary_category = details.secondary
      }

      if (details.name) {
        updateExercise.name = details.name
      }

      if (details.description) {
        updateExercise.description = details.description
      }

      await updateExercise.save()

      return res.status(200).json({ message: 'exercise successfully updated' })
    } catch (e) {
      return res.status(400).json({ message: 'exercise failed to update' })
    }
  }
}

module.exports = exerciseController