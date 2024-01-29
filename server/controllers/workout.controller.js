const { ObjectId } = require('mongodb')

const Workout = require('../models/workout.model')
const Exercise = require('../models/exercise.model')
const Template = require('../models/template.model')
const { WorkoutDetail } = require('../models/detail.model')

const workoutController = {
  get_workout: async (req, res) => {
    try {
      const workout_id = req.params.id
      const workout = await Workout.findById(new ObjectId(workout_id))

      workout.exercises_info = []

      for (let i = 0; i < workout.exercises.length; i++) {
        const exercise = await Exercise.findById(new ObjectId(workout.exercises[i].exercise_id))
        workout.exercises_info.push(exercise)
      }

      console.log(workout)
  
      return res.status(200).json(workout)
  
    } catch (e) {
      return res.status(400).json({ message: 'error in workoutController.get_workout'})
    }
  },
  get_workouts_by_user: async (req, res) => {
    try {
      const uid = req.userData.userId
      const workouts = await Workout.find({ user_id: new ObjectId(uid) }).sort({ startTime: 'asc' })
  
      return res.status(200).json(workouts)
  
    } catch (e) {
      return res.status(400).json({ message: 'error in workoutController.get_workouts_by_user'})
    }
  },
  // use when workout created from scratch
  create_blank_workout: async (req, res) => {
    try {
      const user_id = req.userData.userId

      const inProgress = await Workout.find({ user_id: new ObjectId(uid), endTime: null })

      if (inProgress) {
        return res.status(400).json({ message: 'another workout is in progress'})
      }

      const currTime = new Date()
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday','Thursday', 'Friday','Saturday']
  
      const newWorkout = new Workout({
        user_id,
        name: `${days[currTime.getDay()]} Workout`,
        exercises: [],
        startTime: currTime
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
      const user_id = req.userData.userId
      const template_id = req.params.id

      const inProgress = await Workout.find({ user_id: new ObjectId(user_id), endTime: null })

      if (inProgress.length > 0) {
        return res.status(400).json({ message: 'another workout is in progress'})
      }

      const currTime = new Date()
      
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday','Thursday', 'Friday','Saturday']

      const template = await Template.findById(new ObjectId(template_id))
      console.log(template)

      if (!template) {
        return res.status(404).json({ message: 'template could not be found' })
      }

      const newWorkout = new Workout({
        user_id,
        name: `${days[currTime.getDay()]} - ${template.name}`,
        template_id: new ObjectId(template._id),
        exercises: [],
        startTime: currTime
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
      const user_id = req.userData.userId
      const workout_id = req.params.id

      const workout = await Workout.findById(new ObjectId(workout_id))
      const name = `Copy of ${workout.name}`

      const newWorkout = new Workout({
        user_id, 
        template_id: workout.template_id,
        exercises: [],
        name, 
        startTime: Date.now()
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
  add_workout_detail: async (req, res) => {
    try {
      const workout_id = req.params.id
      const exercise_id = req.body.exercise_id

      // ideally the default reps/weight will be set to the last value as a placeholder

      const newDetail = new WorkoutDetail({
        exercise_id: new ObjectId(exercise_id),
        sets: []
      })

      const workout = await Workout.findById(new ObjectId(workout_id))

      console.log(workout)
      workout.exercises.push(newDetail)

      await workout.save()

      return res.status(200).json({ message: 'detail added to workout', workout })

    } catch (e) {
      console.log(e)
      return res.status(400).json({ message: 'error in add_workout_detail' })
    }
  }, 
  update_exercise: async (req, res) => {

  },
  add_exercise_set: async (req, res) => {
    try {
      const workout_id = req.params.id
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
      const workout_id = req.params.id
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
      const workout_id = req.params.id
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
    try {
      const workout_id = req.params.id
      const detail_id = req.body.detail_id

      const workout = Workout.findById(new ObjectId(workout_id))

      workout.exercises.filter(exercise => exercise._id !== detail_id)

      await workout.save()

      return res.status(200).json({ message: 'exercise successfully deleted' })

    } catch (e) {
      console.log(e)
      return res.status(400).json({ message: 'error in workoutController.delete_exercise'})
    }
  },
  delete_workout: async (req, res) => {
    try {
      
    } catch (e) {
      console.log(e)
      return res.status(400).json({ message: 'error in workoutController.delete_workout'})
    }
  }
}

module.exports = workoutController