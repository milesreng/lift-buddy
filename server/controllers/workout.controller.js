const Workout = require('../models/workout.model')
const Template = require('../models/template.model')
const { WorkoutDetail } = require('../models/detail.model')

const workoutController = {
  get_workout: async (req, res) => {
    try {
      const workout_id = req.params.workout_id
      const workout = await Workout.findById(workout_id)
  
      return res.status(200).json(workout)
  
    } catch (e) {
      return res.status(404).json({ message: 'workout not found' })
    }
  },
  get_workouts_by_user: async (req, res) => {
    try {
      const uid = req.params.uid
      const workouts = await Workout.find({ user_id: uid })
  
      return res.status(200).json(workouts)
  
    } catch (e) {
      return res.status(404).json({ message: 'no workouts found' })
    }
  },
  // use when workout created from scratch
  create_blank_workout: async (req, res) => {
    try {
      const uid = req.params.uid
      const workout = req.body
  
      const newWorkout = new Workout({
        user_id: uid,
        name: workout.name,
        exercises: [],
        startTime: Date.now()
      })
  
      await newWorkout.save()

      return res.status(200).json({ message: 'workout successfully created' })
  
    } catch (e) {
      return res.status(400).json({ message: 'workout could not be created' })
    }
  },
  create_workout_from_template: async (req, res) => {
    
  }
}

module.exports = workoutController