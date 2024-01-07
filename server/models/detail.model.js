const mongoose = require('mongoose')

const setSchema = new mongoose.Schema({
  reps: Number,
  weight: Number
})

const workoutDetailSchema = new mongoose.Schema({
  exercise_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Exercise'
  },
  sets: [setSchema]
})

const WorkoutDetail = mongoose.model('WorkoutDetail', workoutDetailSchema)

module.exports = { workoutDetailSchema, WorkoutDetail }