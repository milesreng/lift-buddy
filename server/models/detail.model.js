const mongoose = require('mongoose')

const exerciseSetSchema = new mongoose.Schema({
  // options: Default, Warmup, ...
  type: {
    type: String,
    required: true
  },
  reps: {
    type: Number,
    required: true
  },
  weight: {
    type: Number,
    required: true
  }
})

const workoutDetailSchema = new mongoose.Schema({
  exercise_id: {
    type: Schema.Types.ObjectId,
    ref: 'Exercise'
  },
  sets: {
    type: [ exerciseSetSchema ]
  }
})

const ExerciseSet = mongoose.model('ExerciseSet', exerciseSetSchema)
const WorkoutDetail = mongoose.model('WorkoutDetail', workoutDetailSchema)

module.exports = { exerciseSetSchema, workoutDetailSchema, ExerciseSet, WorkoutDetail }