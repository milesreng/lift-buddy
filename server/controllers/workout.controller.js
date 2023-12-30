const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Workout = require('../models/workout.model')
const Template = require('../models/template.model')
const { ExerciseSet, WorkoutDetail } = require('../models/detail.model')

exports.get_workout = async (req, res) => {
  try {
    const workout_id = req.params.wid
    const workout = await Workout.findById(workout_id)

    return res.status(200).json(workout)

  } catch (e) {
    return res.status(404).json({ message: 'workout not found' })
  }
}

exports.get_workouts_by_user = async (req, res) => {
  try {
    const uid = req.params.uid
    const workouts = await Workout.find({ user_id: uid })

    return res.status(200).json(workouts)

  } catch (e) {
    return res.status(404).json({ message: 'no workouts found' })
  }
}

// use when workout created from scratch
exports.create_workout = async (req, res) => {
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

  } catch (e) {
    return res.status(400).json({ message: 'workout could not be created' })
  }
}

// use when workout created using template
exports.create_workout_from_template = async (req, res) => {
  try {
    const uid = req.params.uid
    const template_id = req.params.template_id
    const workout = req.body

    const workoutTemplate = Template.findById(template_id)

    const newWorkout = new Workout({
      user_id: uid,
      template_id: template_id,
      name: workout.name,
      exercises: workoutTemplate.exercises,
      startTime: Date.now()
    })

    await newWorkout.save()

  } catch (e) {
    return res.status(400).json({ message: 'workout could not be created' })
  }
}

exports.create_template = async (req, res) => {
  try {
    const uid = req.params.uid
  } catch (e) {
    return res.status(400).json({ message: 'template could not be created' })
  }
}

const create_blank_workout_detail = async (req, res) => {
  const workout_id = req.params.workout_id
  const set = new ExerciseSet({})

  await Workout.findByIdAndUpdate(workout_id, {
    $push: {
      exercises: {
        set
      }
    }
  })
  
}