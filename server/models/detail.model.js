const mongoose = require('mongoose')

const workoutDetailSchema = new mongoose.Schema({
  exercise_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Exercise'
  },
  sets: [{
    type: String,
    reps: Number,
    weight: Number
  }]
})

const WorkoutDetail = mongoose.model('WorkoutDetail', workoutDetailSchema)

module.exports = { workoutDetailSchema, WorkoutDetail }