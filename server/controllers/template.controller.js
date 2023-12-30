const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Workout = require('../models/workout.model')
const Template = require('../models/template.model')
const { ExerciseSet, WorkoutDetail } = require('../models/detail.model')

exports.get_template = async (req, res) => {
  try {
    const template_id = req.params.wid
    const template = await Template.findById(template_id)

    return res.status(200).json(template)

  } catch (e) {
    return res.status(404).json({ message: 'template not found' })
  }
}

exports.create_template = async (req, res) => {
  try {
    const uid = req.params.uid
    const template = req.body

    const newTemplate = new Template({
      user_id: uid,
      name: template.name
    })
    
    await newTemplate.save()

    return res.status(200).json({ message: 'template successfully created' })

  } catch (e) {
    return res.status(404).json({ message: 'template could not be created' })
  } 
}

exports.add_template_detail = async (req, res) => {
  const uid = req.params.uid
  const template_id = req.params.template_id
  const exercise_id = req.params.exercise_id

  const newDetail = new WorkoutDetail({
    exercise_id: exercise_id
  })

  await Template.findByIdAndUpdate(template_id, {
    $push: {
      exercises: {
        _id: ObjectId(newDetail._id),
        sets: []
      }
    }
  },
  { new: true, useFindAndModify: false })
}