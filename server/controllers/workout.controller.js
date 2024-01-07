const { ObjectId } = require('mongodb')

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
      return res.status(404).json({ message: 'error in workoutController.get_workout'})
    }
  },
  get_workouts_by_user: async (req, res) => {
    try {
      const uid = req.params.uid
      const workouts = await Workout.find({ user_id: uid })
  
      return res.status(200).json(workouts)
  
    } catch (e) {
      return res.status(404).json({ message: 'error in workoutController.get_workouts_by_user'})
    }
  },
  // use when workout created from scratch
  create_blank_workout: async (req, res) => {
    try {
      const workout = req.body
  
      const newWorkout = new Workout({
        user_id: workout.user_id,
        name: workout.name,
        exercises: [],
        startTime: Date.now()
      })
  
      await newWorkout.save()

      return res.status(200).json({ message: 'workout successfully created' })
  
    } catch (e) {
      console.log(e)
      return res.status(400).json({ message: 'error in workoutController.create_blank_workout'})
    }
  },
  create_workout_from_template: async (req, res) => {
    try {
      const workout = req.body

      const template = await Template.findById(new ObjectId(workout.template_id))

      const newWorkout = new Workout({
        user_id: workout.user_id,
        name: `${template.name} Workout`,
        template_id: new ObjectId(template._id),
        exercises: [],
        startTime: Date.now()
      })

      for (var i = 0; i < template.exercises.length; i++) {
        const existDetail = template.exercises[i]
        const newDetail = existDetail
        newDetail._id = new ObjectId()

        await newDetail.save()
        newWorkout.exercises.push(newDetail)
      }

      await newWorkout.save()

      return res.status(200).json({ message: 'workout successfully created', newWorkout })

    } catch (e) {
      console.log(e)
      return res.status(400).json({ message: 'error in workoutController.create_workout_from_template'})
    }
  },
  duplicate_workout: async (req, res) => {
    try {
      const workout_id = req.body.workout_id

      const workout = await Workout.findById(new ObjectId(workout_id))
      const name = `Copy of ${workout.name}`

      const newWorkout = new Workout({
        user_id: workout.user_id, 
        template_id: workout.template_id,
        exercises: [],
        name, 
        startTime: Date.now(), 
        endTime: null 
      })

      // console.log(workout.exercises[0])

      // duplicate each instance of exercises and sets

      for (let i = 0; i < workout.exercises.length; i++) {
        const existDetail = workout.exercises[i]
        // console.log(existDetail)
        const newDetail = new WorkoutDetail({
          exercise_id: new ObjectId(existDetail.exercise_id),
          sets: []
        })

        for (let j = 0; j < existDetail.sets.length; j++) {
          const existSet = existDetail.sets[j]
          const newSet = {
            _id: new ObjectId(),
            reps: existSet.reps,
            weight: existSet.weight
          }

          newDetail.sets.push(newSet)
        }

        newWorkout.exercises.push(newDetail)
      }

      // console.log(newWorkout)
      await newWorkout.save()

      return res.status(200).json({ message: 'workout successfully created', newWorkout })

    } catch (e) {
      console.log(e)
      return res.status(400).json({ message: 'error in workoutController.duplicate_workout'})
    }
  },
  add_exercise: async (req, res) => {
    try {
      const exercise_id = req.body.exercise_id
      const workout_id = req.body.workout_id

      const newDetail = new WorkoutDetail({
        exercise_id: new ObjectId(exercise_id),
        sets: []
      })

      const workout = await Workout.findById(new ObjectId(workout_id))

      workout.exercises.push(newDetail)

      await workout.save()

      return res.status(200).json({ message: 'exercise added to workout', workout })
      
    } catch (e) {
      console.log(e)
      return res.status(400).json({ message: 'error in add_exercise' })
    }
  },
  update_exercise: async (req, res) => {

  },
  add_exercise_set: async (req, res) => {
    try {
      const workout_id = req.body.workout_id
      const detail_id = req.body.detail_id
      const set = {
        reps: req.body.reps,
        weight: req.body.weight
      }

      const workout = await Workout.findById(new ObjectId(workout_id))
      const detail = workout.exercises.id(detail_id)

      detail.sets.push(set)

      await workout.save()
    
      return res.status(200).json({ message: 'set added to exercise', workout })

    } catch (e) {
      console.log(e)
      return res.status(400).json({ message: 'error in add_exercise_set' })
    }
  },
  update_exercise_set: async (req, res) => {
    try {
      const workout_id = req.body.workout_id
      const detail_id = req.body.detail_id
      const set_id = req.body.set_id

      const set = {
        reps: req.body.reps,
        weight: req.body.weight
      }

      const workout = await Workout.findById(new ObjectId(workout_id))
      const detail = workout.exercises.id(detail_id)
      const dbSet = detail.sets.id(set_id)

      dbSet.reps = set.reps
      dbSet.weight = set.weight

      await workout.save()

      return res.status(200).json({ message: 'set successfully updated', workout })
    } catch (e) {
      console.log(e)
      return res.status(400).json({ message: 'error in update_exercise_set' })
    }
  },
  end_workout: async (req, res) => {
    try {
      const workout_id = req.body.workout_id
      const workout = await Workout.findById(new ObjectId(workout_id))

      workout.endTime = Date.now()

      await workout.save()

      return res.status(200).json({ message: 'workout successfully ended', workout })
    } catch (e) {
      console.log(e)
      return res.status(400).json({ message: 'error in workoutController.end_workout'})
    }
  },
  update_workout_details: async (req, res) => {
    try {

    } catch (e) {
      console.log(e)
      return res.status(400).json({ message: 'error in workoutController.update_workout_details'})
    }
  },
  delete_exercise: async (req, res) => {

  },
  delete_workout: async (req, res) => {

  }
}

module.exports = workoutController